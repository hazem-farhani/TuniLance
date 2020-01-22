import { Component, OnInit } from '@angular/core';
import { Service } from '../../../models/service.model';
import { ServicesService } from '../../../services/services.service';
import { CategoryService } from '../../../services/category.service';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.scss']
})
export class ServiceAddComponent implements OnInit {
 // private service = new Service(5,'zeaz','xdazeza',5,5);
  serviceForm : FormGroup;
  private categories = null;
  private submitted = false;

  constructor(
    private servicesService:ServicesService,
    private categoryService:CategoryService,
    private authService: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories)
    this.serviceForm = this.formBuilder.group({
      title: '',
      description: '',
      price: 0,
      categoryId: new FormControl("", [ Validators.required ]),
      timerequired: 0,
      photo: new FormControl("", [ Validators.required ]),
    });
  }

  handleFileInput(fileList){
    const file = fileList.item(0);
    this.serviceForm.get('photo').setValue(file)
  }

  changeCategory(e) {
    console.log(e.target.value)
    /*this.serviceForm.get('categoryId').setValue(e.target.value, {
      onlySelf: true
    })*/
  }

  onSubmit(){
    console.log(this.serviceForm.get('categoryId').value);
    console.log(this.authService.getCurrentUser().id);
    for (let controller in this.serviceForm.controls) {
      this.serviceForm.get(controller).markAsTouched();
    }

    if(this.serviceForm.valid) {
    var formData = new FormData();
    formData.append('file', this.serviceForm.get('photo').value , "xd");
    formData.append('title', this.serviceForm.get('title').value);
    formData.append('description', this.serviceForm.get('description').value);
    formData.append('price', this.serviceForm.get('price').value);
    formData.append('timerequired', this.serviceForm.get('timerequired').value);
    formData.append('categoryId', this.serviceForm.get('categoryId').value);
    formData.append('userId', this.authService.getCurrentUser().id);

    this.servicesService.addService(formData).subscribe(
      service => console.log(service),
      err => console.log(err))
    }
  }
}
