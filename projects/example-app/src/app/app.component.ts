import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initExampleRust, get_factorial } from 'wasm-example';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'example-app';
  jsResult = signal<string>('');
  rsResult = signal<string>('');
  jsTime = signal<string>('');
  rsTime = signal<string>('');
  conclusion = signal<string>('');
  calculating = signal<boolean>(false);

  ngOnInit() {
    initExampleRust();
    console.log('initExampleRust done!');
  }

  calculate(inp: number | string) {
    this.calculating.set(true);

    setTimeout(() => {
      const n = typeof inp === 'number' ? inp : parseInt(inp, 10);
      const jsTimeStart = performance.now();
      let f = 0;
      for (let i = 0; i < 10_000_000; i++) {
        f = factorial(n);
      }
      this.jsResult.set(f.toString());
      const jsTime = ((performance.now() - jsTimeStart) / 1000);
      this.jsTime.set(
        jsTime.toFixed(4) + 's'
      );

      const rsTimeStart = performance.now();
      this.rsResult.set(get_factorial(n));
      const rsTime = ((performance.now() - rsTimeStart) / 1000);
      this.rsTime.set(
        rsTime.toFixed(4) + 's'
      );

      this.calculating.set(false);
      this.conclusion.set(`Rust is ${(jsTime/rsTime).toFixed(4)} times faster than JavaScript!`);
    }, 50);
  }
}

function factorial(x: number): number {
  if (x === 0) {
    return 1;
  } else {
    return x * factorial(x - 1);
  }
}
