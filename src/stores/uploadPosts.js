import { defineStore } from "pinia";
import { getAuth } from "firebase/auth";
import { db } from "@/firebase/firebase";
import { addDoc, collection, increment, onSnapshot, orderBy, query, serverTimestamp, updateDoc, doc, arrayUnion, arrayRemove, where} from "firebase/firestore";
import { storage } from "@/firebase/firebase";
import { ref as fer, getDownloadURL, listAll, uploadBytes } from "firebase/storage";
import { computed, onMounted, ref  } from "vue";

const usePostStore = defineStore('posts', ()=>{

    const postRef = collection(db, 'posts')
    const loadingStat = ref(true)
    const mgaPost = ref(null)
    const mgaPostUsers = ref(null)
    const imahe = ref(null)
    const postLoader = ref(true)

    onMounted(()=>{
        displayPosts()
    })

    
    const displayPosts = async()=>{
        const queryRef = query(postRef, orderBy('createdAt'))
        try {
            onSnapshot(queryRef, (snap) => {
                loadingStat.value = true
                let temp = []
                snap.forEach((doc) => {
                    temp.push({ id: doc.id, ...doc.data() })
                })
                loadingStat.value = false
                mgaPost.value = temp
            })
        } catch (error) {
            console.log(error)
        }
       
    }
    const postHandler = async (postData, file)=>{
        const User = getAuth()
        const userWhoPost = {email: User.currentUser.email, displayName: User.currentUser.displayName, photoURL: User.currentUser.photoURL}
        console.log(User.currentUser.displayName)
        await fileUploader(file).then(()=>{
            postLoader.value = true
            addDoc(postRef, {
                userWhoPost: userWhoPost,
                likes: [],
                shares: 0,
                content: postData,
                imageURL: imahe.value,
                createdAt: serverTimestamp()
            }).then(() => postLoader.value = false)
        }).catch((error) => {
            console.log(error)
        })
           
       
    }

    const fileUploader = async (file)=>{
        if(!file) return
        const User = getAuth()
        const storageRef = fer(storage, `images/${User.currentUser.email}/${file.name}`)

        try {
            const snapshot = await uploadBytes(storageRef, file)
            console.log('File uploaded successfully:', snapshot.metadata.name);

            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log('File available at:', downloadURL);

            imahe.value = downloadURL
        } catch (err) {
            console.log(err.code)
        }
    }

    const docUpdater = async(id, newText)=>{
        const postRef = doc(db, 'posts', id)

        await updateDoc(postRef, {
            content: {
                text: newText 
            }
        }).then(()=>{
            alert('your post has been upadated')
        }).catch((error)=>{
            console.log(error.code)
        })
    }
    const likeUpdater = async (id, likeStat) => {
        const postRef = doc(db, "posts", `${id}`)
        const User = getAuth()

        if(likeStat){
            await updateDoc(postRef, {
                likes: arrayUnion(User.currentUser.email)
            }).then(() => {
                
            }).catch((error) => {
                console.log(error.code)
            })
        }else{
            await updateDoc(postRef, {
                likes: arrayRemove(User.currentUser.email)
            }).then(() => {
                
            }).catch((error) => {
                console.log(error.code)
            })
        }

        
    }

    const usersPost = async () => {
        const User = getAuth()
        const queryRef = query(postRef, where("userWhoPost.email", "==", User.currentUser.email), orderBy('createdAt'))
        try {

            onSnapshot(queryRef, (snap) => {
                let temp = []
                snap.forEach((doc) => {
                    temp.push({ id: doc.id, ...doc.data() })
                })

                mgaPostUsers.value = temp
            })
        } catch (error) {
            console.log(error.code)
        }
    }
    const usersPostUpdateProfile = async (disname, image) => {
        const User = getAuth()
        const queryRef = query(postRef, where("userWhoPost.email", "==", User.currentUser.email), orderBy('createdAt'))
        try {

            onSnapshot(queryRef, (snap) => {
                snap.forEach((doc) => {
                    updateDoc(doc.ref, {
                        userWhoPost: {email: User.currentUser?.email, displayName: disname, photoURL: image?  image :User.currentUser.photoURL }
                    })
                })
            })
        } catch (error) {
            console.log(error)
        }
    }





    // const fileDiplayer = async()=>{
    //     const User = getAuth()
    //     const storageRef = fer(storage, `images/${User.currentUser.email}/`)
    //     let temp = []
    //     listAll(storageRef).then((response)=>{
    //         response.items.forEach((item)=>{
    //             console.log
    //             getDownloadURL(item).then((url)=>{
    //                 console.log(url)
    //                 temp.push(url)
    //             })
               
    //         })
           
    //     }).catch((err)=>console.log(err.code))
    //     mgaImage.value = temp
    // }
    const logics = {
        postHandler,
        mgaPost,
        loadingStat,
        docUpdater,
        likeUpdater,
        mgaPostUsers,
        usersPost,
        usersPostUpdateProfile,
        postLoader
    }

    return logics
})


export default usePostStore