

    fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyD4XTscW82DqyUrWhKUsAc1iSakCJXK4Us')
    .then(result => result.json())
    .then(response=>{

        let quote = 'blabla';

        let letterToQuery='A';

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
            return item.category === "monospace"
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
                    $('.btn-category').removeClass('active');
                    $(this).addClass('active');
                    categoryToQuery=category.textContent.toLowerCase();
                    
                    switch(categoryToQuery){
                        case 'serif':
                            list = serif;
                        break;
                        case 'sans-serif':
                            list = sans_serif;
                        break;
                        case 'display':
                            list = display;
                        break;
                        case 'handwriting':
                            list = handwriting;
                        break;
                        case 'monospace':
                            list = monospace;
                        break;                        
                    }
                    
                    var list = list.filter(function(item){
                        if(item.family.charAt(0) === letterToQuery){
                            return item;
                        }
                    })
                    generateList(list);
                });
            });
        }

        
        function generateList(list){
                
            $("#fontList").empty();

            let families = list.map(function(item){
                return item.family;
            });

            if(families.length>0){

            WebFont.load({
                google: {
                families: families
                }
            });
            
            list.forEach(singleItem=>{
                let generated = '<div class="some-font" style="font-family:\''+singleItem.family+'\'">'
                generated=generated+'<h1 class="some-title">'+singleItem.family+'</h1>';
                generated=generated+'<div class="some-text">'+quote+'</div>';
                generated=generated+'<div class="font-select"><span>'+singleItem.family+'</span>+</div>';
                generated=generated+'</div>';
                $("#fontList").append(generated);
            });
            }else{
                $("#fontList").append("<p class='nothing'>Il n'y a, malheureusement, aucune police à charger !</p>");
            }

            grabFont();

        }

        function changeCurrentLetter(letter){
            $('#currentLetter').text(letter);
        }

        function queryByLetter(letterToQuery){

            if(typeof(categoryToQuery)==="undefined"){
                categoryToQuery="sans-serif";
            }

            switch(categoryToQuery){
                case 'serif':
                    list = serif;
                break;
                case 'sans-serif':
                    list = sans_serif;
                break;
                case 'display':
                    list = display;
                break;
                case 'handwriting':
                    list = handwriting;
                break;
                case 'monospace':
                    list = monospace;
                break;                        
            }

            
            list = list.filter(function(item){
                if(item.family.charAt(0) === letterToQuery){
                    return item;
                }
            })
            generateList(list);
            changeCurrentLetter(letterToQuery);
        }

        function getFirstQuote(){
            quote = $('.quote').first().text();  
        }
        
        getFirstQuote();

        function switchQuote(){
            $('.author').on('click',function(){
                quote = $(this).next('.quote').text();
                $('.author').removeClass('active');
                $(this).addClass('active');
                $('.some-text').text(quote);
            });
        }
        switchQuote();
        createNavCategories();
        createNavLetters();
        changeCurrentLetter(letterToQuery);
        $('.abc-button').first().addClass('active');
        queryByLetter(letterToQuery);
        
        


        // NAVIGATION PAR LETTRES

        let links = document.querySelectorAll('.abc-button');
        links.forEach(link=>{
            link.addEventListener('click',function(){
                letterToQuery = link.textContent;
                $('.abc-button').removeClass('active');
                $(this).addClass('active');

                queryByLetter(letterToQuery);
            });
        });

        letters.forEach(letter => {
            var letter = sans_serif.filter(function(item){
                if(item.family.charAt(0) === letter){
                    return item;
                }
            })
            

        });

        let grabbed = "";
        function grabFont(){
            $('.font-select').on('click',function(){
                grabbed = $(this).find('span').text();
                $('#Playground').fadeIn();
            });
        }
        grabFont();

        function applyFont(){
            $('.apply-font').on('click',function(){
                $(this).prev().css('font-family',grabbed);
                $(this).prev().attr('title',grabbed);
            });
        }
        applyFont();

        function playgroundClose(){
            $('#playgroundClose').on('click',function(){
                $("#Playground").fadeOut();
            });
        }
        playgroundClose();

    })
