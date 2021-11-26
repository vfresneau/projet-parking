function init() {
    window.addEventListener('scroll', function(e) {
        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 120,
            header = document.querySelector("header");
        if (distanceY > shrinkOn) {
            document.getElementsByTagName("header")[0].classList.add("smaller");
            document.getElementsByClassName("mon_logo")[0].classList.add("smallerlogo");
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