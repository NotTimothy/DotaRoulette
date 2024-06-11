import { Component, OnInit, inject } from '@angular/core';
import { Hero, HeroDetails } from '../hero.model';
import { HeroService } from '../hero.service';
import { CommonModule, NgForOf, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DotaRouletteMaterialModule } from "../material-module";
import { NgModel, FormsModule } from "@angular/forms";
import { NgFor } from "@angular/common";

const heroImageMap: { [key: string]: string } = {
  "Anti-Mage": 'antimage',
  "Centaur Warrunner": 'centaur',
  "Timbersaw": 'shredder',
  "Magnus": 'magnataur',
  "Treant Protector": 'treant',
  "Doom": 'doom_bringer',
  "Nature's Prophet": 'furion',
  'Underlord': 'abyssal_underlord',
  'Io': 'wisp',
  'Outworld Destroyer': 'obsidian_destroyer',
  'Necrophos': 'necrolyte',
  'Clockwerk': 'rattletrap',
  'Wraith King': 'skeleton_king',
  'Windranger': 'windrunner',
  'Zeus': 'zuus',
  'Shadow Fiend': 'nevermore',
  'Lifestealer': 'life_stealer',
  'Vengeful Spirit': 'vengefulspirit',
  'Queen of Pain': 'queenofpain',
  'Storm Spirit': 'storm_spirit',
  // Add more hero mappings as needed
};

// @ts-ignore
@Component({
  selector: 'app-heroes',
  templateUrl: './tims-heroes.component.html',
  styleUrls: ['./tims-heroes.component.sass'],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    HttpClientModule,
    NgForOf,
    NgOptimizedImage,
    FormsModule,
    DotaRouletteMaterialModule,
  ],
  providers: [HeroService, DotaRouletteMaterialModule],
  standalone: true,
})

export class TimsHeroesComponent {
  agents: string[] = [];
  numOfBoxes = 0;
  spinTimeout: any = null;
  spinArcStart = 10;
  spinTime = 0;
  spinTimeTotal = 0;
  startAngle = 0;
  ctx: CanvasRenderingContext2D | null = null;
  public heroes: HeroDetails[] = [];
  public heroImages: String[] = [];
  selectedHeroName: string = '';
  selectedHeroes: HeroDetails[] = [];
  public heroService: HeroService = inject(HeroService);
  isSpinning: boolean = false;
  selectedHero: HeroDetails | null = null;
  textRadius = 160;
  searchTerm: string = '';

  constructor() {}

  ngOnInit(): void {
    this.getHeroes();
  }

  onHeroSelect(heroName: string) {
    this.selectedHeroName = heroName;
  }

  filteredHeroes(): HeroDetails[] {
    if (!this.searchTerm) return this.heroes;

    const searchTerm = this.searchTerm.toLowerCase();
    return this.heroes.filter(hero => {
      return hero.localized_name.toLowerCase().includes(searchTerm);
    });
  }

  getImages(): void {
    for (let i = 0; i < this.heroes.length; i++) {
      const hero = this.heroes[i];
      const imageName = heroImageMap[hero.localized_name] || hero.localized_name.replaceAll(' ', '_').toLowerCase();
      const image = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${imageName}.png`;
      this.heroImages.push(image);
    }
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
      this.getImages();
    });
  }

  getSelectedHeroImage(hero: HeroDetails): string {
    const name = hero.localized_name;
    const imageName = heroImageMap[name] || name.replaceAll(' ', '_').toLowerCase();
    return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${imageName}.png`;
  }

  onHeroSelected(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const heroName = checkbox.value;
    const selectedHero = this.heroes.find(hero => hero.localized_name === heroName);
    if (selectedHero) {
      if (checkbox.checked) {
        this.selectedHeroes.push(selectedHero);
      } else {
        const index = this.selectedHeroes.indexOf(selectedHero);
        if (index > -1) {
          this.selectedHeroes.splice(index, 1);
        }
      }
    }
  }

  addHeroToPool(heroName: string) {
    const selectedHero = this.heroes.find(hero => hero.localized_name === heroName);
    if (selectedHero && !this.selectedHeroes.includes(selectedHero)) {
      this.selectedHeroes.push(selectedHero);
    }
  }

  saveHeroes() {
    this.numOfBoxes = this.selectedHeroes.length;
    this.drawRouletteWheel();
  }

  clearWheel() {
    this.agents = [];
    this.numOfBoxes = 0;
    this.drawRouletteWheel();
  }

  checkAll() {
    const checkboxes = document.querySelectorAll('input[name="hero"]') as NodeListOf<HTMLInputElement>;
    if (checkboxes.length > 0) {
      const checked = checkboxes[0].checked;
      checkboxes.forEach((checkbox) => {
        checkbox.checked = !checked;
        const event = new CustomEvent('change', { detail: { target: checkbox } });
        this.onHeroSelected(event);
      });
    }
  }

  spin() {
    const spinAngleStart = Math.random() * 10 + 10;
    this.spinTime = 0;
    this.spinTimeTotal = Math.random() * 3 + 4 * 1000;
    this.rotateWheel(spinAngleStart);
  }

  rotateWheel(spinAngleStart: number) {
    // Implement the rotateWheel logic here
    // Example:
    const spinTimeout = setInterval(() => {
      this.spinTime += 30;
      if (this.spinTime >= this.spinTimeTotal) {
        clearInterval(spinTimeout);
        this.stopRotateWheel();
        return;
      }
      const spinAngle = spinAngleStart - this.easeOut(this.spinTime, 0, spinAngleStart, this.spinTimeTotal);
      this.startAngle += spinAngle * Math.PI / 180;
      this.drawRouletteWheel();
    }, 30);
  }

  easeOut(t: number, b: number, c: number, d: number) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }

  getColor(item: number, maxitem: number) {
    const phase = 0;
    const center = 128;
    const width = 127;
    const frequency = (Math.PI * 2) / maxitem;

    const red = Math.sin(frequency * item + 2 + phase) * width + center;
    const green = Math.sin(frequency * item + 0 + phase) * width + center;
    const blue = Math.sin(frequency * item + 4 + phase) * width + center;

    return this.RGB2Color(red, green, blue);
  }

  RGB2Color(r: number, g: number, b: number) {
    return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
  }

  byte2Hex(n: number) {
    const nybHexString = '0123456789ABCDEF';
    return String(nybHexString.substr((n >> 4) & 0x0f, 1)) + nybHexString.substr(n & 0x0f, 1);
  }

  drawRouletteWheel() {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const outsideRadius = 200;
      const textRadius = 160;
      const insideRadius = 125;

      this.ctx = canvas.getContext('2d');
      if (this.ctx) {
        this.ctx.clearRect(0, 0, 500, 500);
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 2;
        this.ctx.font = 'bold 12px Helvetica, Arial';

        const arc = (2 * Math.PI) / this.selectedHeroes.length;

        for (let i = 0; i < this.selectedHeroes.length; i++) {
          const angle = this.startAngle + i * arc;
          const hero = this.selectedHeroes[i];

          // Draw the hero image on the wheel
          const img = new Image();
          hero.image_url = this.getSelectedHeroImage(hero);
          img.src = hero.image_url;
          img.onload = () => {
            if (this.ctx) {
              this.ctx.save();

              // Create a clipping path for the current segment
              this.ctx.beginPath();
              this.ctx.moveTo(250, 250);
              this.ctx.arc(250, 250, outsideRadius, angle, angle + arc);
              this.ctx.lineTo(250, 250);
              this.ctx.clip();

              // Draw the image stretched to fill the segment
              this.ctx.drawImage(
                img,
                250 - outsideRadius,
                250 - outsideRadius,
                outsideRadius * 2,
                outsideRadius * 2
              );

              this.ctx.restore();
            }
          };
        }
      }
    }
  }

  stopRotateWheel() {
    const degrees = (this.startAngle * 180) / Math.PI + 90;
    const arc = (360 / this.selectedHeroes.length);
    const index = Math.floor((360 - degrees % 360) / arc);
    const selectedHero = this.selectedHeroes[index];

    if (selectedHero) {
      this.selectedHero = selectedHero;

      if (this.ctx) {
        this.ctx.save();
        this.ctx.font = 'bold 30px Helvetica, Arial';
        this.ctx.fillStyle = 'black';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(selectedHero.localized_name, 250, 250 + 10);
        this.ctx.restore();
      }
    }
  }
}
