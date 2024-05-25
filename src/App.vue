<template>
<div class="container">
        <div v-show="!isEditMode" class="parent-container-one">
        <h1>User Profile</h1>
        <img class="image" :src="image" alt="">
        <label for="">Name:</label> 
        <span id="outputName">{{ outputName }}</span>
        <hr>
        <label for="">Email:</label> 
        <span id="outputEmail">{{ outputEmail }}</span>
        <hr>
        <label for="">Interests:</label> 
        <span id="outputInterests">{{ outputInterests }}</span>
        <hr>
        <button @click="editprofile()">Edit Profile</button>
        </div>

        <div v-show="isEditMode" class="parent-container-two">
            <h1>User Profile</h1>
						<img :src="image" alt="">
            <label for="">Name:</label> 
            <input type="text" id="myname"  v-model="outputName">
            <hr>
            <label for="">Email:</label> 
            <input type="email" id="myemail" v-model="outputEmail">
            <hr>
            <label for="">Interests:</label> 
            <input type="text" id="myinterests" v-model="outputInterests">
            <hr>
            <button class="update" @click="updateProfile()">Update Profile</button>
        </div>
        
    </div>
</template>


<script>
	import image from './itachi.jpeg'


	export default {
		name: 'App',
		data() {
			return {
				image : image,
				outputName: "",
				outputEmail: '',
				outputInterests: '',
				isEditMode: false
			}
		}, //created is called whenever App is created
		async created(){
			const userData = await this.fetchUserProfile()
			this.outputName = userData.name
			this.outputEmail = userData.email
			this.outputInterests = userData.interests
		},
		methods: {
			editprofile() {
				this.isEditMode = true
			},
			async updateProfile() {
				this.isEditMode = false
				const payload = {
					name: this.outputName,
					email: this.outputEmail,
					interests: this.outputInterests
				}
				const resJson = await this.updateUserProfile(payload)
				console.log(resJson)
			},
			async fetchUserProfile(){
				const res = await fetch('get-profile')
				return await res.json()
			},
			async updateUserProfile(payload){
				const res = await fetch('update-profile', {
					method: "POST",
					headers: {
      			'Accept': 'application/json',
      			'Content-Type': 'application/json'
    			},
					body: JSON.stringify(payload)
				})
				return await res.json()
			}
		}
		}

</script>

<style>

	.image {
		border-radius: 5px;
	}

	* {
			margin:0;
			padding:0;
			box-sizing: border-box;
	}

	body {
			font-family: serif;
			margin:100px;	
			background-color: #7950f2;
			color: white;
	}

	.container {
			width: 500px;
			margin-right: auto;
			margin-left: auto;
			box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
	}

	img {
			width: 100%;
			padding: 20px;
			display: block;
			height: 400px;
			border-radius: 5px;	
			box-shadow: 0 12px 24px rgba(0, 0, 0	,0.25);
			margin-bottom: 50px;
	}

	.container label {
		font-size: 18px;
		font-family: sans-serif;
		margin-right: 20px;
		margin-left: 30px;

	}

	.parent-container-one {
			padding: 20px;
			background-color: #ffa8a88c;

	}

	.parent-container-two {
			padding: 20px;


	}


	.parent-container-two input {
			font-size: 20px;
			font-family: sans-serif;
			padding: 10px 30px;
	}

	hr {
			margin-top: 30px;
			margin-bottom: 50px;
	}

	button {
			display: block;
			background-color: blueviolet;
			color: white;
			padding: 30px;  
			border:none;
			border-radius: 10px;
			cursor: pointer;
			font-size: 16px;
	}

	button:hover {
			display: block;
			background-color: #be3030b6;
			color: white;
			cursor: pointer;
	}



	span {
			font-size: 20px;
			font-weight: bold;
			font-family: sans-serif;
	}




	.container {
		width: 600px;
		background-color: #bb424296;

		margin-right: auto;
		margin-left: auto;
	}

	h1 {
		margin-bottom: 20px;
		color: white;
		text-align: center;
		text-transform: uppercase;
		font-family: sans-serif	;
	}
</style>
