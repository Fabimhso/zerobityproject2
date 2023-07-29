$(() => {
	var menuopen = false
	$(".header .mobile__menu-button").click(() => {
		if (menuopen) {
			$(".mobile__menu").slideToggle(300)
			$(".header .mobile__menu-button, .header .mobile__menu-button").removeClass("fi-rr-cross-small").addClass("fi-rr-menu-burger")
			menuopen = false
		} else {
			$(".mobile__menu").slideToggle(300)
			$(".header .mobile__menu-button, .header .mobile__menu-button").removeClass("fi-rr-menu-burger").addClass("fi-rr-cross-small");
			menuopen = true
		}
	})
})