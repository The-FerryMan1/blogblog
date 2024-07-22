import { defineStore } from "pinia";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile} from 'firebase/auth'
import { useRouter } from "vue-router";
import { onMounted, ref, onBeforeMount } from "vue";
import { getDownloadURL, uploadBytes, ref as fer } from "firebase/storage";
import { storage } from "@/firebase/firebase";
import usePostStore from "./uploadPosts";
const useAuthStore = defineStore('auth',()=>{
    const poster = usePostStore()
    const { usersPostUpdateProfile } = poster

    const photos = ref({
        photoURL: "http://localhost:3000/src/assets/user.png"
    })
    const router = useRouter()
    const errMessage = ref()
    const imageUrl = ref(null)
    const user = ref({
        id: null,
        email: null,
        photo: null,
        displayName: null,
        emailVer: null,

    })

    onMounted(()=>{
        getUser()
    })

    const getUser = async()=>{
        const auth = getAuth()
        onAuthStateChanged(auth, (USER)=>{
            if(USER){
                user.value = {id: USER?.uid, email: USER?.email, photo: USER?.photoURL, displayName: USER?.displayName, emailVer: USER?.emailVerified}
                console.log('changed')
            }else{
                
            }
        })
    }

    const signUpUser = async(credentials)=>{
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth, credentials.email, credentials.password, photos.value)
            .then((userCredential) => user.value = { id: userCredential?.user?.uid, email: userCredential?.user?.email, photo: userCredential?.user?.photoURL})
        .then(() => router.push({name: 'home'}))    
        .catch((error) => alert(error.code, error.message))
    }

    const LoginUser = async(credentials)=>{
        const auth = getAuth()
        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => user.value = { id: userCredential?.user?.uid, email: userCredential?.user?.email, photo: userCredential?.user?.photoURL })
        .then(() => router.push({ name: 'home' }))
        .catch((error) => alert(error.code, error.message))   
    }

    const logoutUser = async()=>{
        const auth = getAuth()
        await signOut(auth)
        .then(()=>{
            user.value = { id: null, email: null, photo: null, displayName: null, emailVer: null }
            router.push({ name: 'UnAuthedHome'})
        })
        .catch((error)=> console.log(error.code))
    }

    const updateUser = async(nameDis, photo)=>{
        const auth = getAuth()
        await fileUploader(photo).then(()=>{
            console.log(imageUrl.value)
            updateProfile(auth.currentUser, {
                displayName: nameDis, photoURL: imageUrl.value
            })
        }
        ).then(async()=>{
            console.log(nameDis)
           usersPostUpdateProfile(nameDis, imageUrl.value)
        }).then(()=>{
            alert('profile updated')
        }).catch((error)=>{
            console.log(error)
        })
    }

    const fileUploader = async (file) => {
        if (!file) return
        const User = getAuth()
        const storageRef = fer(storage, `images/${User.currentUser.email}/profilePic/${file.name}`)
        try {
            const snapshot = await uploadBytes(storageRef, file)
            const downloadURL = await getDownloadURL(snapshot.ref);
            imageUrl.value = downloadURL
        } catch (err) {
            console.log(err.code)
        }
    }


    const logics = {
        getUser,
        signUpUser,
        LoginUser,
        logoutUser,
        user,
        updateUser

    }

    return logics

})

export default useAuthStore