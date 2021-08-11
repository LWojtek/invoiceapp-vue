<template>
    <div class="login__wrapper">
        <div class="login__form">
            <h1>Login</h1>
            <form>
                <div class="login">
                    <input 
                        type="text" 
                        id="username" 
                        v-model="username" 
                        :class="{ active : username }" 
                        required
                    >
                    <label 
                        for="username" 
                        :class="{ active : username }" 
                    >
                        Username
                    </label>
                </div>
                <div class="password">
                    <input 
                        type="password" 
                        id="password" 
                        v-model="password" 
                        required 
                        :class="{ active : password }"
                    >
                    <label 
                        for="password" 
                        :class="{ active : password }"
                    >
                        Password
                    </label>
                </div>
                <div class="btn--wrapper">
                    <!-- <router-link to="/invoices"> --> 
                        <button class="btn--submit" @click.prevent="login">
                            Login
                        </button>
                    <!-- </router-link> -->
                </div>
            </form>
            <p>
                Not a member? 
                <router-link to="/signup">
                    <span>
                        Signup
                    </span>
                </router-link>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {         
                username: '',
                password: '',            
            }
        },
        methods: {
            login(){
                if (this.username === 'admin' && this.password === 'pass') {
                    this.$store.commit('setAuth', true)
                    this.$router.replace({ name: 'Invoices' })
                } else {
                    console.log('Username incorrect or password')
                }

            }
        }
    }
</script>

<style lang="scss" scoped>

@import '@/assets/scss/variables.scss';

.login__wrapper {
    width: 100vw;
    height: 100vh;
    
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 999px) {
        padding-top: 14.3rem;
        overflow: hidden;
    }


    .login__form {
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
        transition: transform ease 250ms;
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
            border-bottom: 2px solid $primary-violet-dark;
        }
    }

    input:focus ~ label {
        transform: translateY(-4rem);
        color: $primary-violet-dark;
    }

    input:focus {
        border-bottom: 2px solid $primary-violet-dark;
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