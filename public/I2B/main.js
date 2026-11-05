const settings = {
	last_canvas: null,
	last_dithering: null,
	last_source: "",

	width: 62,
	greyscale_mode: "luminance",
	inverted: false,
	dithering: false,
	monospace: false,
}

function setUIElement(selector, value) {
	const elem = document.querySelector(selector);
	switch(elem.getAttribute("type")) { //should all be <input>
		case "checkbox":
			elem.checked = value;
			break;

		default:
			elem.value = value;
	}
	return elem;
}

function initUI() {
	document.body.ondragover = (e) => e.preventDefault();
	document.body.ondrop = (e) => {
		e.preventDefault();
		loadNewImage(URL.createObjectURL(e.dataTransfer.items[0].getAsFile()));
	}
	document.body.onpaste = (e) => {
		event.preventDefault();
		loadNewImage(URL.createObjectURL(e.clipboardData.items[0].getAsFile()));
	}

	//buttons
	const r = () => parseCanvas(settings.last_canvas); //shorten for compactness

	const fileInput = document.querySelector('input[type="file"]');
	fileInput.onchange = (e) => {
		 loadNewImage(URL.createObjectURL(e.target.files[0]));
	}

	// 点击textarea打开文件选择
	document.querySelector('#text').onclick = () => fileInput.click();

	setUIElement('#darktheme', settings.inverted).onchange = (e) => {
		const element = document.querySelector('#text');
		if(e.target.checked) element.classList.add("dark");
		else element.classList.remove("dark");
	};

	setUIElement('#inverted', settings.inverted).onchange = (e) => {settings.inverted = e.target.checked; r()};
	setUIElement('#dithering', settings.dithering).onchange = (e) => {settings.dithering = e.target.checked; r()};
	setUIElement('#monospace', settings.monospace).onchange = (e) => {settings.monospace = e.target.checked; r()};

	document.querySelector('#greyscale_mode').onchange = (e) => {
		settings.greyscale_mode = e.target.value;
		parseCanvas(settings.last_canvas);
	};

	setUIElement('#width', settings.width).onchange = (e) => {
		settings.width = e.target.value;
		loadNewImage(settings.last_source);
	};

	document.querySelector('#clipboard').onclick = (e) => {
		 document.querySelector('#text').select();
		 document.execCommand("copy");
	}
}

async function loadNewImage(src) {
	if(src === undefined) return;

	if(settings.last_source && settings.last_source !== src) URL.revokeObjectURL(settings.last_source);

	settings.last_source = src;
	const canvas = await createImageCanvas(src);
	settings.last_canvas = canvas;
	settings.last_dithering = null;
	await parseCanvas(canvas);
}

async function parseCanvas(canvas) {
	const text = canvasToText(canvas);
	document.querySelector('#text').value = text;
	document.querySelector('#charcount').innerText = text.length;
	
	// 当没有内容时，textarea显示为可点击状态
	const textarea = document.querySelector('#text');
	if (text.length === 0) {
		textarea.style.cursor = 'pointer';
	} else {
		textarea.style.cursor = 'default';
	}
}

window.onload = () => {
	initUI();
	loadNewImage("select.png");
}
