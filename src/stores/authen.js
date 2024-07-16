import { defineStore } from "pinia";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'
import { useRouter } from "vue-router";
import { onMounted, ref, onBeforeMount } from "vue";


const useAuthStore = defineStore('auth',()=>{
    const photos = ref({
        photoURL: "http://localhost:3000/src/assets/user.png"
    })
    const router = useRouter()
    const errMessage = ref()
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
        const unsub = onAuthStateChanged(auth, (USER)=>{
            if(USER){
                unsub()
                user.value = {id: USER?.uid, email: USER?.email, photo: USER?.photoURL, displayName: USER?.displayName, emailVer: USER?.emailVerified}
            }else{
                
            }
        })
        return unsub
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

    const updateUser = async()=>{
        
    }


    const logics = {
        getUser,
        signUpUser,
        LoginUser,
        logoutUser,
        user,

    }

    return logics

})

export default useAuthStore