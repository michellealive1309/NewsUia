import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'
import { LoadingController, AlertController, ToastController } from '@ionic/angular'
import { UserService } from '../services/user.service'
import { universityDepartment } from './department'

@Component({
  selector: 'app-newcomer',
  templateUrl: './newcomer.page.html',
  styleUrls: ['./newcomer.page.scss'],
})
export class NewcomerPage implements OnInit { //Unused class

  faculty: any[] = universityDepartment
  selectedFaculty: any
  selectedMajority: any
  subDepartment: any[]
  onFacultySelected: boolean = false
  onMajoritySelected: boolean = false

  constructor(private router: Router,
              private loadCtrl: LoadingController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private userService: UserService) {
   }

  ngOnInit() {
    
  }

  onFacultyChange(){
    if (this.selectedFaculty === "101"){
      this.subDepartment = this.faculty[0].subDepartment
      this.onFacultySelected = true
    } else if (this.selectedFaculty === "102"){
      this.subDepartment = this.faculty[1].subDepartment
      this.onFacultySelected = true
    } else if (this.selectedFaculty === "103"){
      this.subDepartment = this.faculty[2].subDepartment
      this.onFacultySelected = true
    } else if (this.selectedFaculty === "104"){
      this.subDepartment = this.faculty[3].subDepartment
      this.onFacultySelected = true
    } else if (this.selectedFaculty === "105"){
      this.subDepartment = this.faculty[4].subDepartment
      this.onFacultySelected = true
    } else if (this.selectedFaculty === "106"){
      this.subDepartment = this.faculty[5].subDepartment
      this.onFacultySelected = true
    } else if (this.selectedFaculty === "107"){
      this.subDepartment = this.faculty[6].subDepartment
      this.onFacultySelected = true
    } else if (this.selectedFaculty === "108"){
      this.subDepartment = this.faculty[7].subDepartment
      this.onFacultySelected = true
    }
  }

  onMajorityChange() {
    if (this.selectedMajority != null)
      this.onMajoritySelected = true
    else
      this.onMajoritySelected = false
  }

  async onSubmittedData() {
    if (this.selectedFaculty != null && this.selectedMajority != null){
      const loading = await this.loadCtrl.create({
        message: 'Obtaining Data'
      })
      await loading.present().then(() => { this.userService.addProfile(this.selectedFaculty, this.selectedMajority) })
      await loading.dismiss()
      const alert = await this.alertCtrl.create({
        header: 'Obtained Data',
        buttons: [
          { 
            text: "Okay",
            handler: () => { this.router.navigate(['../tabs']) }
          }
        ] 
      })
      await alert.present()
    }
    else {
      const toast = await this.toastCtrl.create({
        message: "Invalid Login",
        duration: 2000
      })
      await toast.present()
    }
  }

}
