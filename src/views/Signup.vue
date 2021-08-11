<template>
    <div class="signup__wrapper">
        <div class="signup__form">
            <h1>Register account</h1>
            <form @submit.prevent="signUp">
                <div class="name">
                     <input 
                        type="text" 
                        id="firstname" 
                        v-model="form.firstName" 
                        :class="{ active : form.firstName }" 
                        required
                    >
                    <label 
                        for="firstname" 
                        :class="{ active : form.firstName }" 
                    >
                        First Name
                    </label>
                </div>
                <div class="lastname">
                    <input 
                        type="text" 
                        id="lastname" 
                        v-model="form.lastName" 
                        :class="{ active : form.lastName }" 
                        required
                    >
                    <label 
                        for="lastname" 
                        :class="{ active : form.lastName }" 
                    >
                        Last Name
                    </label>
                </div>
                <div class="login">
                    <input 
                        type="email" 
                        id="email" 
                        v-model="form.email" 
                        :class="{ active : form.email }" 
                        required
                    >
                    <label 
                        for="email" 
                        :class="{ active : form.email }" 
                    >
                        Email address
                    </label>
                </div>
                <div class="password">
                    <input 
                        type="password" 
                        id="password" 
                        v-model="form.password" 
                        required 
                        :class="{ active : form.password }"
                    >
                    <label 
                        for="password" 
                        :class="{ active : form.password }"
                    >
                        Password
                    </label>
                </div>
                <div class="password">
                    <input 
                        type="password" 
                        id="confirmpassword" 
                        v-model="form.confirmpassword" 
                        required 
                        :class="{ active : form.confirmpassword }"
                    >
                    <label 
                        for="confirmpassword" 
                        :class="{ active : form.confirmpassword }"
                    >
                        Confirm Password
                    </label>
                </div>
                <div class="btn--wrapper">
                    <button class="btn--submit">
                        Sign Up
                    </button>
                </div>
            </form>
            <p>
                Already member?
                <router-link to="/">
                    <span>
                        Login
                    </span>
                </router-link>
            </p>
        </div>
    </div>
</template>

<script>
import firebaseApp from '@/firebase/firebaseInit'

    export default {
        data(){
            return {
                form: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmpassword: '',
                }
            }
        },
        methods: {
            signUp(){
                if (this.form.password === this.form.confirmpassword){
                    this.submit()
                } else {
                    console.log('Passwords dont match')
                }
            },
            submit(){
                firebaseApp
                .auth()
                .createUserWithEmailAndPassword(this.form.email, this.form.password)
                .then(data => {
                
                data.user
                    .updateProfile({
                        firstName: this.form.firstName,
                        lastName: this.form.lastName,
                        email: this.form.email,
                        password: this.form.password
                    })
                    .then(() => {
                        data.user
                        this.$store.commit('setAuth', true)
                        this.$router.push({ path: '/invoices'})
                    });
                })
                .catch(err => {
                this.error = err.message;
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

@import '@/assets/scss/variables.scss';

.signup__wrapper {
    width: 100vw;
    height: 100vh;
    
    display: flex;
    justify-content: center;
    align-items: center;

    
    @media screen and (max-width: 999px) {
        padding-top: 14.3rem;
        overflow: hidden;
    }


    .signup__form {
        width: 40rem;
        background: #fff;
        box-shadow: 0 4px 8px 0 rgba(0,0,0, 0.1);
        border-radius: 1rem;

        @media screen and (max-width: 467px) {
            width: 100%;
            height: 100vh;
            padding-top: 2rem;
         
        }

        
        h1 {
            color: $primary-violet-dark;
            text-align: center;
            margin-bottom: 3rem;
            border-bottom: 2px solid #f1f1f1;
            padding: 4rem 0;
        }

        p {
            text-align: center;
            padding-bottom: 4rem;;

            span {
                font-weight: 700;
                margin-left: 0.5rem;
                color: $primary-violet-dark;
                cursor:pointer;
                transition: color ease 200ms;

                &:hover {
                    color: $primary-violet-light;
                }
            }
        }
    }
}

.btn--wrapper {
    padding: 0 4rem;
}

.name,
.lastname,
.login,
.password {
    margin-bottom: 3.5rem; 
    padding: 0 4rem;
    position: relative;

    label {
        position: absolute;
        top: 1rem;
        left: 4rem;
        font-size: 1.4rem;
        transform: translateY(-2rem);
        transition: all ease 250ms;
        pointer-events: none;
        color: rgb(179, 179, 179);

        &.active {
            transform: translateY(-4rem);
            color: $primary-violet-dark;
        }
    }

    input {
        height: 3rem;
        border: none;
        border-bottom: 2px solid #f1f1f1;
        padding: 0.5rem;
        margin-top: 1rem;
        transition: 200ms border ease;

        &.active {
            border-bottom: 2px solid #9175ff8a;
        }
    }

    input:focus ~ label {
        transform: translateY(-4rem);
        color: $primary-violet-dark;
    }

    input:focus {
        border-bottom: 2px solid #9175ff8a;
    }
}



.btn--submit {
    width: 100%;
    background-color: $primary-violet-dark;
    padding: 1.3rem;
    font-size: 1.6rem;
    color: #fff;
    font-weight: bold;
    border-radius: 2rem;
    margin: 1rem 0 4rem;
    outline: none;
    border: none;
    cursor: pointer;
    transition: background-color 200ms;
    letter-spacing: 1px;
    font-weight: 400;

    &:hover {
        background-color: $primary-violet-light;
    }
}


</style>