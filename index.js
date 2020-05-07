import Objekt from "./objekt.js";

let c = document.getElementById("c");
let ctx = c.getContext("2d");
let objekt = new Objekt();

let przesuwany = false;

let skalowanie = 8;

window.l = 50;
window.r = 500;

window.a = 0;
window.b = 250;
window.c = 1000;

c.onclick = e =>
{
	if (e.ctrlKey)
		objekt.dodajWezel(e.x / skalowanie, e.y / skalowanie);
	else
	{
		let wybrany = objekt.wybierz(e.x / skalowanie, e.y / skalowanie);
		if (wybrany)
		{
			objekt.wybrany = wybrany;
		}
	}
};

c.onmousedown = e =>
{
	let wybrany = objekt.wybierz(e.x / skalowanie, e.y / skalowanie);
	if (wybrany)
	{
		przesuwany = wybrany;
	}
};

c.onmousemove = e =>
{
	if (przesuwany)
	{
		przesuwany.przesun(e.x / skalowanie, e.y / skalowanie);
	}
};

c.onmouseup = e =>
{
	przesuwany = false;
};

c.onwheel = e =>
{
	let wybrany = objekt.wybierz(e.x / skalowanie, e.y / skalowanie);
	if (wybrany)
	{
		wybrany.zmienRozmiar(-e.deltaY);
	}
};

setInterval(() =>
{
	c.width = window.innerWidth / skalowanie;
	c.height = window.innerHeight / skalowanie;

	for (let wezel of objekt.wezly)
	{
		for (let wezel2 of objekt.wezly)
		{
			if (wezel != wezel2)
			{
				wezel.rx -= (wezel.x - wezel2.x) / 5000 * (wezel2.r / wezel.r);
				wezel.ry -= (wezel.y - wezel2.y) / 5000 * (wezel2.r / wezel.r);
			}
		}
	}
	
	ctx.clearRect(0, 0, c.width, c.height);

	let obraz = new ImageData(c.width, c.height);

	for (let x = 0; x < c.width; x++)
	{
		for (let y = 0; y < c.height; y++)
		{
			let dystansR = 0;
			let dystansG = 0;
			let dystansB = 0;
			for (let wezel of objekt.wezly)
			{
				let dyst = window.r * wezel.r / ((wezel.x - x) ** 2 + (wezel.y - y) ** 2);
				dystansR += dyst * wezel.kolor.r;
				dystansG += dyst * wezel.kolor.g;
				dystansB += dyst * wezel.kolor.b;
			}
			//if (dystans > window.l)
			obraz.data[(x + y * c.width) * 4    ] = dystansR;
			obraz.data[(x + y * c.width) * 4 + 1] = dystansG;
			obraz.data[(x + y * c.width) * 4 + 2] = dystansB;
			
			obraz.data[(x + y * c.width) * 4 + 3] = 255;
		}
	}

	//console.log(obraz);
	ctx.putImageData(obraz, 0, 0);

	objekt.rysuj(ctx, c);

}, 20);