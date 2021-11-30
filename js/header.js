function init() {
    window.addEventListener('scroll', function(e) {
        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 120,
            header = document.querySelector("header");
        if (distanceY > shrinkOn) {
            document.getElementsByTagName("header")[0].classList.add("smaller");
            document.getElementsByClassName("mon_logo")[0].classList.add("smallerlogo");
            document.getElementsByClassName("wrapper")[1].classList.add("smallerh1");
            document.getElementById("titre").classList.add("smallh1padding");
            var adminbutton = document.getElementById("adminbutton");
            adminbutton.classList.add("smalladmin");
            adminbutton.innerHTML = "<i class=\"fas fa-user-shield\"></i>";
            var spans = document.getElementsByTagName("span");
            for (x = 0; x < spans.length; x++) {
                spans[x].classList.add("backsmall");
            }
        } else {
            if (document.getElementsByTagName("header")[0].classList.contains("smaller")) {
                document.getElementsByTagName("header")[0].classList.remove("smaller");
            }
            if (document.getElementsByClassName("mon_logo")[0].classList.contains("smallerlogo")) {
                document.getElementsByClassName("mon_logo")[0].classList.remove("smallerlogo");
            }
            if (document.getElementsByClassName("wrapper")[1].classList.contains("smallerh1")) {
                document.getElementsByClassName("wrapper")[1].classList.remove("smallerh1");
            }
            if (document.getElementById("titre").classList.contains("smallh1padding")) {
                document.getElementById("titre").classList.remove("smallh1padding");
            }
            if (document.getElementById("adminbutton").classList.contains("smalladmin")) {
                document.getElementById("adminbutton").classList.remove("smalladmin");
                document.getElementById("adminbutton").textContent = "ADMINISTRATEUR";
            }
            var spans = document.getElementsByTagName("span");
            for (x = 0; x < spans.length; x++) {
                if (spans[x].classList.contains("backsmall")) {
                    spans[x].classList.remove("backsmall");
                };
            }
        }
       
    });
}
window.onload = init();