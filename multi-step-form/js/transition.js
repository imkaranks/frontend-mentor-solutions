const timeline = gsap.timeline({defaults: { ease: "power4.inOut", duration: 2 }});

timeline.to(".form-sidebar", { opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', duration: 2.2 })
        .to(".form-step-item", { opacity: 1, y: 0, stagger: .25 }, '-=2')
        .to(".form-fieldset-header", { opacity: 1, y: 0, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }, '-=2')
        .to(".form-group-wrapper", { opacity: 1, y: 0, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }, '-=2')
        .to(".form-controls-step-1", { opacity: 1 }, '-=2')