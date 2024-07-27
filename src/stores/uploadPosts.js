import { defineStore } from "pinia";
import { getAuth } from "firebase/auth";
import { db } from "@/firebase/firebase";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, updateDoc, doc, arrayUnion, arrayRemove, where, getDoc, deleteDoc} from "firebase/firestore";
import { storage } from "@/firebase/firebase";
import { ref as fer, getDownloadURL, uploadBytes } from "firebase/storage";
import { onMounted, ref  } from "vue";
import { useRouter } from "vue-router";


const usePostStore = defineStore('posts', ()=>{
    const router = useRouter()
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
                mgaPost.value = temp.reverse()
            })
        } catch (error) {
            console.log(error)
        }
       
    }
    const postHandler = async (postData, file)=>{
        const User = getAuth()
        const userWhoPost = {email: User.currentUser.email, displayName: User.currentUser.displayName, photoURL: User.currentUser.photoURL}
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
            

            const downloadURL = await getDownloadURL(snapshot.ref);
            

            imahe.value = downloadURL
        } catch (err) {
            console.log(err.code)
        }
    }

    const docUpdater = async(id, newText, imager)=>{
        const postRef = doc(db, 'posts', id)
        if(!newText && !imager ) return
        await fileUploader(imager).then(async()=>{
            if(imager && newText){
                console.log("may image at text")
                await updateDoc(postRef, {
                 content: {
                    text: newText 
                },
                imageURL: imahe.value,
                })
            }
            else if(!imager && newText){
                console.log("walang image")
                await updateDoc(postRef, {
                 content: {
                    text: newText 
                }
                })
            }
            else if(imager && !newText){
                console.log("may image walang text")
                await updateDoc(postRef, {
                  imageURL: imahe.value,
                })
            }
            else{
                 return
            }
            
        }).catch((err)=> alert(err))
        
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

    const getOnePost = async(id)=>{
        const postRef = doc(db, "posts", `${id}`)
        const onePost = await getDoc(postRef)
        return onePost.data()
    }
    // const updateDocContent = async()=>{

    // }

    const deletePost = async(id)=>{
        const postRef = doc(db, "posts", `${id}`)
        alert('Are you sure?')
        await deleteDoc(postRef).then(()=>{
            alert('your post successfully deleted')
            
        }).then(()=>{
            router.push({name: 'home'})
        })
        .catch((err)=> console.log(err.code))
    }
    const logics = {
        postHandler,
        mgaPost,
        loadingStat,
        docUpdater,
        likeUpdater,
        mgaPostUsers,
        usersPost,
        usersPostUpdateProfile,
        postLoader,
        getOnePost,
        deletePost
    }

    return logics
})


export default usePostStore