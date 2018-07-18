let letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
let specials = ['1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','*','(',')','[',']','{','}','?','<','>'];

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
function randomate(number) {
	let str = '';
	for (let i = 0; i < number; i++) {
		if (getRandomInt(2)) {
			str = str + specials[getRandomInt(26)];
		} else {
			str = str + letters[getRandomInt(52)];
		}
	}
	return str;
}

export default randomate;