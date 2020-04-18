import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SingleSpaService } from 'src/single-spa.service';
import { zip } from 'rxjs';

@Component({
  selector: 'slb-spa-host',
  templateUrl: './spa-host.component.html',
  styleUrls: ['./spa-host.component.less'],
})
export class SpaHostComponent implements OnInit {
  @ViewChild('app1', { static: true }) private app1: ElementRef;
  @ViewChild('app2', { static: true }) private app2: ElementRef;

  constructor(private service: SingleSpaService) {}

  ngOnInit() {
    this.service.mount('app1', this.app1.nativeElement).subscribe();
    this.service.mount('app2', this.app2.nativeElement).subscribe();
  }

  async ngOnDestroy() {
    await zip(
      this.service.unmount('app1'),
      this.service.unmount('app2')
    ).toPromise();
  }
}
