let slides = Array.from(document.querySelectorAll('.slide'));
        let captions = Array.from(document.querySelectorAll('.caption'));
        let progressBar = document.getElementById('progressBar');
        let autoplayDelay = 8000;
        let autoplay = null;
        let isPlaying = true;

        // ---------- AUTOPLAY CONTROL ----------
        function startAutoplay() {
            clearInterval(autoplay);
            autoplay = setInterval(nextSlide, autoplayDelay);
            startProgress();
            isPlaying = true;
            updateToggleButton();
        }

        function stopAutoplay() {
            clearInterval(autoplay);

            // Freeze progress bar immediately
            let currentWidth = getComputedStyle(progressBar).width;
            progressBar.style.transition = 'none';
            progressBar.style.width = currentWidth; // lock at current width
            void progressBar.offsetWidth; // force reflow
            progressBar.style.width = currentWidth;
            progressBar.style.opacity = '0'; // hide

            isPlaying = false;
            updateToggleButton();
        }

        function updateToggleButton() {
            const toggleBtn = document.getElementById('autoplayToggle');
            toggleBtn.textContent = isPlaying ? '◁ ||' : '▷';
        }

        // ---------- PROGRESS BAR ----------
        function startProgress() {
            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
            progressBar.style.opacity = '1';
            setTimeout(() => {
                progressBar.style.transition = `width ${autoplayDelay}ms linear`;
                progressBar.style.width = '100%';
            }, 50);
        }

        // ---------- SLIDE CONTROLS ----------
        function nextSlide() {
            slides.forEach(slide => slide.className = 'slide');
            captions.forEach(caption => caption.className = 'caption');

            slides.push(slides.shift());
            captions.push(captions.shift());

            slides[0].classList.add('current');
            slides[1].classList.add('next');
            slides[slides.length - 1].classList.add('previous');

            captions[0].classList.add('current-caption');
            captions[1].classList.add('next-caption');
            captions[captions.length - 1].classList.add('previous-caption');

            startProgress();
        }

        function prevSlide() {
            slides.forEach(slide => slide.className = 'slide');
            captions.forEach(caption => caption.className = 'caption');

            slides.unshift(slides.pop());
            captions.unshift(captions.pop());

            slides[0].classList.add('current');
            slides[1].classList.add('next');
            slides[slides.length - 1].classList.add('previous');

            captions[0].classList.add('current-caption');
            captions[1].classList.add('next-caption');
            captions[captions.length - 1].classList.add('previous-caption');

            startProgress();
        }

        // ---------- BUTTON EVENTS ----------
        document.getElementById('down_button').addEventListener('click', e => {
            e.preventDefault();
            if (isPlaying) startAutoplay();
            nextSlide();
        });

        document.getElementById('up_button').addEventListener('click', e => {
            e.preventDefault();
            if (isPlaying) startAutoplay();
            prevSlide();
        });

        document.getElementById('autoplayToggle').addEventListener('click', function() {
            if (isPlaying) {
                stopAutoplay();
            } else {
                startAutoplay();
            }
        });

        // ---------- MOUSE EVENTS ----------
        document.getElementById('container').addEventListener('mouseenter', () => {
            if (isPlaying) clearInterval(autoplay);
        });
        document.getElementById('container').addEventListener('mouseleave', () => {
            if (isPlaying) startAutoplay();
        });

        // ---------- INIT ----------
        startAutoplay();
