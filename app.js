//DATA
const planPrice = {
	monthly: {
		arcade: 9,
		advanced: 12,
		pro: 15
	},
	yearly: {
		arcade: 90,
		advanced: 120,
		pro: 150
	}
};

const addonsPrice = {
	addonMonthly: {
		onlineService: 1,
		largerStorage: 2,
		customizableProfile: 2
	},
	addonYearly: {
		onlineService: 10,
		largerStorage: 20,
		customizableProfile: 20
	}
};

const { monthly } = planPrice;
const { addonMonthly } = addonsPrice;
const { yearly } = planPrice;
const { addonYearly } = addonsPrice;

// Navigation Progress
let progress = 0;
let plan = 'monthly';
let currentPlan = 'arcade';
let currentPlanPrice = 9;
let selectedAddons = 'No add-ons';

///const info = $('.your-info'); 
//const backBtn = document.querySelector('.back');
///const backBtn = $('.back').get(0); 
//const tab = document.getElementsByClassName('tab');
const tab = $('.tab');
//const progressStep = document.querySelectorAll('.progress');
///const progressStep = $('.progress');
//const validateInput = document.querySelectorAll('.validateInput');
const validateInput = $('.validateInput');
//const invalidText = document.querySelectorAll('.invalid');
const invalidText = $('.invalid');

// Navigation Progress
// Price Toggle
//const monthlySub = document.querySelector('.monthly');
const monthlySub = $('.monthly'); 
//const yearlySub = document.querySelector('.yearly');
const yearlySub = $('.yearly');
//const arcadePrice = document.getElementById('arcade-price');
const arcadePrice = $('#arcade-price');
//const advancedPrice = document.getElementById('advanced-price');
const advancedPrice = $('#advanced-price');
//const proPrice = document.getElementById('pro-price');
const proPrice = $('#pro-price');
//const toggle = document.querySelector('.toggle');
const toggle = $('.toggle');

//const onlinePrice = document.getElementById('online-price');
const onlinePrice = $('#online-price');
//const storagePrice = document.getElementById('storage-price');
const storagePrice = $('#storage-price');
//const customPrice = document.getElementById('custom-price');
const customPrice = $('#custom-price');
//const freeMonths = document.querySelectorAll('.free');
const freeMonths = $('.free');
//const radioPlan = document.querySelectorAll('.radio-plan');
const radioPlan = $('.radio-plan');
//const checkboxes = document.querySelectorAll('.checkboxes');
const checkboxes = $('.checkboxes');
//const choice = document.querySelectorAll('.pick-choice');
const choice = $('.pick-choice');




//FUNCTIONALITY 

// Navigation Progress
function next(step) {
	if (progress === tab.length - 1) return false;
	if (progress === 0 && !valid()) return false;

	let currentStep = step + progress;
	console.log( 'next fct. currentStep :' + currentStep);
	progress = currentStep;

	stepIndication(progress);
};

function back(step) {
	if (progress === 0) return false;

	currentStep = step + progress;
	console.log('back fct. currentStep :' + currentStep);
	progress = currentStep;

	stepIndication(progress);
};

function stepIndication(n) {

	//if (n > 0) .$('.back').get(0).style.visibility = 'visible';
	//else $('.back').get(0).style.visibility = 'hidden';

	if (n > 0) $('.back').css('visibility','visible');
	else $('.back').css('visibility','hidden');

	// for (let i = 0; i < tab.length; i++) {
	// 	//tab[i].classList.remove('active');
	// 	//$('.progress')[i].classList.add('hide');
	// };
	tab.removeClass('active');
	$('.progress').addClass('hide');


	//tab[n].classList.add('active');
	//$('.progress')[n].classList.remove('hide');
	tab.eq( n ).addClass('active');
	$('.progress').eq( n ).removeClass('hide');

};


// Toggle
// toggle.addEventListener('click', () => {
// 	const result = toggle.classList.toggle('active');
// 	console.log('toggle' + result);
// 	plan = result ? 'yearly' : 'monthly';
// 	subscription();
// });

toggle.on( "click", () => {
	//const result = toggle.classList.toggle('active');
	const result = toggle.toggleClass( 'active' );
	console.log( result[0]);

	plan = result[0] ? 'yearly' : 'monthly';
	subscription();

} );


// Price Select Plan
const userPlanPrice = () => {
	if (plan === 'monthly') {
		arcadeValue = monthly.arcade;
		advancedValue = monthly.advanced;
		proValue = monthly.pro;
	} else {
		arcadeValue = yearly.arcade;
		advancedValue = yearly.advanced;
		proValue = yearly.pro;
	}
	if (currentPlan === 'arcade') currentPlanPrice = arcadeValue;
	else if (currentPlan === 'advanced') currentPlanPrice = advancedValue;
	else if (currentPlan === 'pro') currentPlanPrice = proValue;
	// currentPlanPrice is Global variable
};

const totalAddons = () => {
	if (plan === 'monthly') {
		onlineValue = addonMonthly.onlineService;
		largerValue = addonMonthly.largerStorage;
		customValue = addonMonthly.customizableProfile;
	} else {
		onlineValue = addonYearly.onlineService;
		largerValue = addonYearly.largerStorage;
		customValue = addonYearly.customizableProfile;
	}
	selectedAddons = [];

	for (let i = 0; i < checkboxes.length; i++) {
		if (checkboxes.eq(i)[0].checked) {
			selectedAddons.push({
				addon: checkboxes.eq(i)[0].value,
				price:
				checkboxes.eq(i)[0].value === 'onlineService'
						? onlineValue
						: checkboxes.eq(i)[0].value === 'largerStorage' ? largerValue : customValue
			});
		}
	}

	if (selectedAddons.length === 0) selectedAddons = 'No add-ons';
};

// Subscription
const subscription = () => {
	userPlanPrice();
	totalAddons();
	if (plan === 'monthly') {
		// Step 2 - Select Plan
		arcadePrice.text( `$${monthly.arcade}/mo`);
		advancedPrice.text( `$${monthly.advanced}/mo`);
		proPrice.text(`$${monthly.pro}/mo`);
		// Step 2 - Select Plan

		// Step 3 - Add-Ons
		onlinePrice.text( `$${addonMonthly.onlineService}/mo`);
		storagePrice.text(`$${addonMonthly.largerStorage}/mo`);
		customPrice.text( `$${addonMonthly.customizableProfile}/mo`);
		// Step 3 - Add-Ons


		//monthlySub.classList.add('active-subscription');
		monthlySub.addClass('active-subscription');
		//yearlySub.classList.remove('active-subscription');
		yearlySub.removeClass('active-subscription');

		// for (const element of freeMonths) {
		// 	element.style.display = 'none';
		// }
		freeMonths.hide();


	} else {
		// Step 2 - Select Plan
		arcadePrice.text( `$${monthly.arcade}/mo`);
		advancedPrice.text( `$${yearly.advanced}/mo`);
		proPrice.text( `$${yearly.pro}/mo`);
		// Step 2 - Select Plan

		// Step 3 - Add-Ons
		onlinePrice.text( `$${addonYearly.onlineService}/mo`);
		storagePrice.text( `$${addonYearly.largerStorage}/mo`);
		customPrice.text( `$${addonYearly.customizableProfile}/mo`);
		// Step 3 - Add-Ons

		//monthlySub.classList.remove('active-subscription');
		monthlySub.removeClass('active-subscription');
		//yearlySub.classList.add('active-subscription');
		yearlySub.addClass('active-subscription');

		// for (const element of freeMonths) {
		// 	element.style.display = 'block';
		// }
		freeMonths.show();
		
	}
};



const radioButton = (selectedRadio) => {
	// currentPlan is Global variable
	currentPlan = selectedRadio;
	userPlanPrice();
};
// Price Select Plan

// Subscription

// Total Price Add-Ons and Custom Style
const pickedAddons = () => {
	// Style
	for (let i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			choice[i].classList.add('active-plan');
		} else choice[i].classList.remove('active-plan');
	}
	// Style
	totalAddons();
};
// Total Price Add-Ons



// Validations
const valid = () => {
	let valid = true;
	for (let i = 0; i < validateInput.length; i++) {
		if (validateInput[i].value.length === 0) {
			validateInput[i].classList.add('invalid-input');
			invalidText[i].classList.remove('hide-message');
			valid = false;
		} else invalidText[i].classList.add('hide-message');
	}
	return valid;
};

function hideInvalidMessage(currentElement) {
	currentElement.classList.remove('invalid-input');
	currentElement.previousElementSibling.lastElementChild.classList.add('hide-message');
}
// Validations
