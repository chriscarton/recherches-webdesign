
        /*
    fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyD4XTscW82DqyUrWhKUsAc1iSakCJXK4Us')
    .then(result => result.json())
    */

    fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyD4XTscW82DqyUrWhKUsAc1iSakCJXK4Us')
    .then(result => result.json())
    .then(response=>{
        // console.log(response)
        items = response.items;

        var sans_serif = items.filter(function(item){
            return item.category === "sans-serif"
        });

        var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

        function createNav(){

            let nav=document.querySelector('#Nav');

            let links = [];
            letters.forEach(letter=>{
                $("#abcNav").append("<button class='abc-button'>"+letter+"</button>");
            });

        }
        createNav();

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

                // console.log(list);
                let families = list.map(function(item){
                    return item.family;
                    // return item.family;
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

    // WebFont.load({
    //     google: {
    //     families: ['Droid Sans', 'Droid Serif']
    //     }
    // });