var tops
var individual_view
var close_btn

let requestURL = 'https://mathcitations.github.io/tops.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
   tops = request.response;
}

function start(){
   individual_view = document.getElementById("individualView");
   close_btn = document.getElementsByClassName("close")[0];
   // When the user clicks on <span> (x), close the modal
   close_btn.onclick = function() {
       individual_view.style.display = "none";
   }
   // When the user clicks anywhere outside of the modal, close it
   window.onclick = function(event) {
       if (event.target == individual_view) {
           individual_view.style.display = "none";
       }
   }
}
 
function open_individual_view(mr){
   var h2 = document.getElementById("author-name");
   var area = document.getElementById("area");
   var msn_link = document.getElementById("MSN-link");
   var sc_link = document.getElementById("Sc-link");
   var rg_link = document.getElementById("RG-link");
   var gs_link = document.getElementById("GS-link");
   var gs_search = document.getElementById("GS-search");
   var gs_on = document.getElementById("GS-on");
   var gs_citations = document.getElementById("gs-citations");
   var msn_citations =  document.getElementById("msn-citations");
   var msn_publications =  document.getElementById("msn-publications");
   //var sc_citations =  document.getElementById("sc-citations");
   //var sc_publications =  document.getElementById("sc-publications");
   //var rg_citations =  document.getElementById("rg-citations");
   //var rg_publications =  document.getElementById("rg-publications");
   var phd_year =  document.getElementById("phd-year");
   var hp_view =  document.getElementById("hp-view");
   var hp_link =  document.getElementById("hp-link");
   var prizes =  document.getElementById("prizes");
   record = tops[mr];
   h2.innerHTML = record.name;
   msn_link.href = "https://mathscinet.ams.org/mathscinet/search/author.html?mrauthid="+record.mr.toString();
   msn_citations.innerHTML = record.citations.toString();
   msn_publications.innerHTML = record.publications.toString();
   if (record.scopus_id!=null){
       sc_link.href = "https://www.scopus.com/authid/detail.uri?authorId="+record.scopus_id.toString();
       if(record.scopus_citations==null) record.scopus_citations = 0;
       if(record.scopus_publications==null) record.scopus_publications = 0;
       //sc_citations.innerHTML = record.scopus_citations.toString();
       //sc_publications.innerHTML = record.scopus_publications.toString();
   }
   var rg_on = document.getElementById("RG-on");
   var rg_search = document.getElementById("RG-search");
   if ((record.RG_name!=null)&&(record.RG_name!="")){
       rg_on.style.display = "block";
       rg_search.style.display = "none";
       rg_link.href = "https://www.researchgate.net/profile/"+record.RG_name;
       //rg_citations.innerHTML = record.RG_citations.toString();
       //rg_publications.innerHTML = record.RG_publications.toString();
   }
   else{
       rg_on.style.display = "none";
       rg_search.style.display = "block";
       rg_search.href = 'https://www.researchgate.net/search.Search.html?type=researcher&query='+record.name;
       //rg_citations.innerHTML = "-";
       //rg_publications.innerHTML = "-";
   }
   
   if (record.GS_id!=null){
       gs_on.style.display = "block";
       gs_search.style.display = "none";
       gs_link.href = "https://scholar.google.com/citations?user="+record.GS_id;
       //gs_citations.innerHTML = record.GS_citations.toString();
   }
   else{
       gs_on.style.display = "none";
       gs_search.style.display = "block";
       gs_search.href = "https://scholar.google.com/citations?view_op=search_authors&mauthors="+record.name;
       //gs_citations.innerHTML = "-";
   }
   area.innerHTML = record.area;
   
   if (record.alma_mater=="unknown"){
       phd_year.innerHTML = record.phd_year.toString()+" (estimated)";}
   else
       if (("genealogy_id" in record) && (record.genealogy_id!=null) && (record.genealogy_id > 20)){
        phd_year.innerHTML = '<a href="https://www.genealogy.math.ndsu.nodak.edu/id.php?id='+record.genealogy_id.toString()+'">'+record.phd_year.toString()+'</a>';    
       } else phd_year.innerHTML = record.phd_year.toString();
   
   if("website" in record){
       if ((record.website != "") && (record.website != null)){
           hp_link.href = record.website;
           hp_view.style.display = "block";
       }
       else hp_view.style.display = "none";
   } else hp_view.style.display = "none";
   
   if(("prizes" in record)&&(record.prizes!=0)){
       prizes.style.display="block";
       pp = "<b>Awards</b>: ";
       if ((record.prizes & 1) != 0) pp += "Invited talk at ICM. ";
       if ((record.prizes & 2) != 0) pp += "Fields medal. ";
       if ((record.prizes & 4) != 0) pp += "Able prize. ";
       if ((record.prizes & 8) != 0) pp += "Breakthrough prize. ";
       if ((record.prizes & 16) != 0) pp += "Shaw prize. ";
       if ((record.prizes & 32) != 0) pp += "Wolf prize. ";
       if ((record.prizes & 64) != 0) pp += "Ostrowski prize. ";
       if ((record.prizes & 128) != 0) pp += "Gauss prize. ";
       if ((record.prizes & 256) != 0) pp += "Chern prize. ";
       if ((record.prizes & 512) != 0) pp += "Rolf Schock Prize. ";
       if ((record.prizes & 1024) != 0) pp += "Mirzakhani Prize. ";
       prizes.innerHTML = pp;
   } else prizes.style.display="none";
   
   individual_view.style.display = "block";
}

