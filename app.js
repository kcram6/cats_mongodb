var createCat = (kitten) => {
    let data = `name=${encodeURIComponent(kitten.name)}`;
    data += `&age=${encodeURIComponent(kitten.age)}`;
    data += `&owner=${encodeURIComponent(kitten.owner)}`;
    data += `&image=${encodeURIComponent(kitten.image)}`;
    return fetch("http://localhost:8080/cats", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
    })
};

var getCats = () => {
    return fetch("http://localhost:8080/cats");
}

var imageLinks = new Array();

imageLinks[0] = 'U6f9ZEy.gif'; //jumping cat
imageLinks[1] = 'oH4Z3fB.gif'; //orange cat
imageLinks[2] = 'Stu2eNJ.gif'; //meow cat
imageLinks[3] = 'w9A2PP7.gif'; //grumpy cat
imageLinks[4] = 'm7JgTqp.gif'; //playing cat


function getRandomImage(imgAr, path) {
    path = path || 'https://i.imgur.com/'; // default path here
    var num = Math.floor( Math.random() * imgAr.length );
    var img = imgAr[ num ];
    console.log(path+img)
    return path+img;
}


var app = new Vue({
    el: '#app',
    data: {
        name: '',
        age: '',
        owner: '',
        cats: [],
        showCatForm: false,
        image: 'https://imgur.com/w9A2PP7.gif',
    },
    methods: {
        addCat: function () {
            createCat({
                name:this.name,
                age: this.age,
                owner: this.owner,
                image: getRandomImage(imageLinks, "https://i.imgur.com/")
            }).then(response => {
                this.loadCats();
                console.log('cat created')
                
            })
            this.name = "";
            this.owner = "";
            this.age = "";
            this.showCatForm = false;
        },
        newCat: function () {
            this.showCatForm = true;
        },
        loadCats: function () {
            getCats().then(response => {
                response.json().then(data => {
                    console.log("data: ", data);
                    this.cats = data;
                });
            });
        },
    },
    created: function () {
        console.log('created app'); //load initial data
        this.loadCats();
        console.log('after loading cats')
        
    }
});


