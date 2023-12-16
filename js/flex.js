var movableObject = document.getElementById("object");
        var svgContainer = document.getElementById("container")

        svgContainer.addEventListener('mouseover', () => {
            movableObject.classList.add("moving");
        });
        
        svgContainer.addEventListener('mouseout', () => {
            movableObject.classList.remove("moving");
        });

        svgContainer.addEventListener('click', () => {
            var e = document.getElementById("E");
            e.src = "image/e_colored.svg";
            var t = document.getElementById("T");
            t.src = "image/t_colored.svg";

            var capy = document.getElementById("capy");
            capy.style.visibility = 'visible';

            var caption = document.getElementById("text");
            caption.style.visibility = 'visible';

            svgContainer.classList.add("shaking");

            setTimeout(() =>{
                capy.style.visibility = 'hidden';
                caption.style.visibility ='hidden';
                caption.style.visibility = 'hidden';
                svgContainer.classList.remove("shaking");
                e.src = "image/e.svg";
                t.src = "image/t.svg";
            }, 5000);
        });