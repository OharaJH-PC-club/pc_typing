
        let canva = document.getElementById("canvas")
        canva.innerHTML="<h1 id='plobrem'>問題</h1><h2 id='roma'>mondai</h2>"

        let roma=""
        let kanji=""


        function putForCanvas(html){
            let canva = document.getElementById("canvas")
            canva.innerHTML=html        
        }

        function showThePloblem(kanjif,romaf){
            let canvaf = document.getElementById("plobrem")
            let canvas = document.getElementById("roma")
            canvaf.innerHTML=kanjif
            canvas.innerHTML=romaf
        }



        function showingtest(first,second){
            showThePloblem(first,second)
            roma =second
            kanji=first
        }
        
        let plobrem_index = 0
        let plobrems=[["みかん","mikan"],["新羽島","shinhashima"],["東京","Toukyo"],["上野","Ueno"]]

        function nextPlobrem(){
            try{
                showingtest(plobrems[plobrem_index][0],plobrems[plobrem_index][1])
                plobrem_index++                
            }
            catch{
                showingtest("終わり","")
            }
                
                
        }

        function keypress_ivent(e) {
            if (e.key == roma[0]){
                roma = roma.slice(1);
                showThePloblem(kanji,roma)
                if (roma ==""){
                    nextPlobrem()
                }
            }
                
            
        }

        document.addEventListener('keypress', keypress_ivent);
