import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  // FormGroup Allowes us to create reactive form
  // it means we are preaparing JSON object,and it wont be created automatically
  // we will have ability to use binder(automatic casting to object properties)
  recipeForm: FormGroup; 
  editMode:boolean = false; 

  constructor(
    // Here also we can initate some service
    private router: Router,
    private route: ActivatedRoute
  ) {}
  

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.initForm();
          this.editMode=params['id'] != null
        }
      );
  }
  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    // if (this.editMode) {
    //   this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    // // } else {
    //   this.recipeService.addRecipe(this.recipeForm.value);
    // // }
    // this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  console.log(this.recipeForm);


    // Returns value of FormArray (exact array)
    // (<FormArray>this.recipeForm.get('ingredients').value);
  
    // Returns Array of Form Groups
    // (<FormArray>this.recipeForm.get('ingredients').controls);

    // Returns object(ArrayForm)
    // (<FormArray>this.recipeForm.get('ingredients'));

  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    // how control works
    // (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    ////This is if we are additing an object and we are using service for it
    ////(I mean if we are passing id of editing object and we are getting that object here)

    // if (this.editMode) {
    //   const recipe = this.recipeService.getRecipe(this.id);
    //   recipeName = recipe.name;
    //   recipeImagePath = recipe.imagePath;
    //   recipeDescription = recipe.description;
    //   if (recipe['ingredients']) {

    ////filling form groups to formArray dynamically.
    ////To do it we should push form group objects to FormArray it means
    ////FormControll is and single input
    ////FormGroup is group of FormControlls
    ////FormArray is an array of FormGroups(it means to 
    ////create array we should have in array formgroups)

    //     for (let ingredient of recipe.ingredients) {
    //       recipeIngredients.push(
    //         new FormGroup({
    //           'name': new FormControl(ingredient.name, Validators.required),
    //           'amount': new FormControl(ingredient.amount, [
    //             Validators.required,
    //             Validators.pattern(/^[1-9]+[0-9]*$/)
    //           ])
    //         })
    //       );
    //     }
    //   }
    // }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
