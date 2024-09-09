import { Component, OnInit, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { NavigationExtras} from '@angular/router';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {


    @Input() headerColor: string = '#F53D3D';
    @Input() textColor: string = '#FFF';
    @Input() contentColor: string = '#F9F9F9';
    @Input() title: string = ''; // Provide a default value or mark as optional
    @Input() hasMargin: boolean = true;
    @Input() expanded: boolean = false; // Initialize with a default value
  
    @ViewChild('accordionContent') elementView!: ElementRef; // Use the non-null assertion (`!`)
    
    viewHeight: number = 0; // Initialize with a default value
  
    constructor(public renderer: Renderer2) { }
  
    ngAfterViewInit() {
      this.viewHeight = this.elementView.nativeElement.offsetHeight;
  
      if (!this.expanded) {
        this.renderer.setStyle(this.elementView.nativeElement, 'height', '0px');
      }
    }
    
    ngOnInit() {}
  
    toggleAccordion() {
      this.expanded = !this.expanded;
      const newHeight = this.expanded ? this.viewHeight + 'px' : '0px';
      this.renderer.setStyle(this.elementView.nativeElement, 'height', newHeight);
    }
  }