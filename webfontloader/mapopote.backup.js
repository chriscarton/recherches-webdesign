

    fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyD4XTscW82DqyUrWhKUsAc1iSakCJXK4Us')
    .then(result => result.json())
    .then(response=>{

        items = response.items;

        //Tri des différentes familles
        var serif = items.filter(function(item){
            return item.category === "serif"
        });

        //C'est celle-là qu'on va utiliser par défaut
        var sans_serif = items.filter(function(item){
            return item.category === "sans-serif"
        });

        var display = items.filter(function(item){
            return item.category === "display"
        });

        var handwriting = items.filter(function(item){
            return item.category === "handwriting"
        });

        var monospace = items.filter(function(item){
            return item.category === "handwriting"
        });

        var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

        function createNavLetters(){

            let nav=document.querySelector('#Nav');

            let links = [];
            letters.forEach(letter=>{
                $("#abcNav").append("<button class='abc-button'>"+letter+"</button>");
            });

        }

        function createNavCategories(){
            let categories=document.querySelectorAll('.btn-category');
            
            
            categories.forEach(category=>{
                category.addEventListener('click',function(){
                    category.classList.add('active');
                    categoryToQuery=category.textContent.toLowerCase();
                    
                    switch(categoryToQuery){
                        case 'serif':
                            alert('serif!');
                        break;
                        case 'sans-serif':
                            alert('sans-serif!')
                        break;
                        case 'display':
                            alert('display!');
                        break;
                        case 'handwriting':
                            alert('handwriting!')
                        break;
                        case 'monospace':
                            alert('monospace!')
                        break;
                    }




                });
            });
        }
        createNavCategories();
        createNavLetters();

        let links = document.querySelectorAll('.abc-button');
        links.forEach(link=>{
            link.addEventListener('click',function(){
                let letterToQuery = link.textContent;

                var list = sans_serif.filter(function(item){
                    if(item.family.charAt(0) === letterToQuery){
                        return item;
                    }
                })
                
                $("#fontList").empty();

                let families = list.map(function(item){
                    return item.family;
                });

                WebFont.load({
                    google: {
                    families: families
                    }
                });
                
                list.forEach(singleItem=>{
                    let generated = '<div class="some-font" style="font-family:\''+singleItem.family+'\'">'
                    generated=generated+'<h1 class="some-title">'+singleItem.family+'</h1>';
                    generated=generated+'<div class="some-text">Ceci est le véritable secret de la vie : être complètement engagé avec ce que vous faites ici et maintenant. Et au lieu d\'appeler cela travailler, réaliser que c\'est jouer.</div>';
                    generated=generated+'</div>';
                    $("#fontList").append(generated);
                });
                
            });
        });

        letters.forEach(letter => {
            var letter = sans_serif.filter(function(item){
                if(item.family.charAt(0) === letter){
                    return item;
                }
            })
            

        });
        


    })
