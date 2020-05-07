import Wezel from "./wezel.js";

export default
class Objekt
{
	constructor()
	{
		this.wezlGlowny = new Wezel(100, 100, 20);
		this.wybrany = this.wezlGlowny;
		this.wezly = [this.wezlGlowny];
	}

	dodajWezel(x, y)
	{
		let wezel = new Wezel(x, y, 6 * Math.random() + 12);
		
		this.wybrany.dodajWezel(wezel);

		this.wezly.push(wezel);

		this.wybrany = wezel;
	}

	rysuj(ctx, c)
	{
		this.wezlGlowny.rysuj(ctx, c);
	}

	wybierz(x, y)
	{
		for (let wezel of this.wezly.reverse())
		{
			if ((wezel.x - x) ** 2 + (wezel.y - y) ** 2 <= wezel.r ** 2)
			{
				this.wezly.reverse();
				return wezel;
			}
		}
		
		this.wezly.reverse();
		return false;
	}
}
