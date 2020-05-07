export default
class Wezel
{
	constructor(x, y, r)
	{
		this.x = x;
		this.y = y;
		this.r = r;
		this.dzieci = [];
		this.rx = (Math.random() - 0.5) * 3;
		this.ry = (Math.random() - 0.5) * 3;

		if (r < 5) r = 5;

		this.kolor =
		{
			r: Math.random(),
			g: Math.random(),
			b: Math.random()
		};

		//console.log(this);
	}

	dodajWezel(wezel)
	{
		this.dzieci.push(wezel);
	}

	rysuj(ctx, c)
	{
		this.x += this.rx;
		this.y += this.ry;

		this.rx *= 0.9995;
		this.ry *= 0.9995;

		if (this.rx > 15) this.rx = 15;
		else if (this.rx < -15) this.rx = -15;

		if (this.ry > 15) this.ry = 15;
		else if (this.ry < -15) this.ry = -15;

		if (this.x < 0 || this.x > c.width)
			this.rx = - this.rx;
		
		if (this.y < 0 || this.y > c.height)
			this.ry = - this.ry;

		for (let wezel of this.dzieci)
		{
			wezel.rysuj(ctx, c);

			// ctx.beginPath();
			// ctx.moveTo(this .x, this .y);
			// ctx.lineTo(wezel.x, wezel.y);
			// ctx.stroke();
		}

		// ctx.beginPath();
		// ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
		// ctx.stroke();
	}

	przesun(x, y)
	{
		let px = this.x - x;
		let py = this.y - y;

		// for (let wezel of this.dzieci)
		// {
		// 	wezel.przesun(wezel.x - px, wezel.y - py);
		// }

		this.x = x;
		this.y = y;
	}

	zmienRozmiar(r)
	{
		this.r += r;
	}
}