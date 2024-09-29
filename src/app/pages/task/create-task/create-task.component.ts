import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent {
  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _serviceTask: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.taskForm = this.fb.group({
      name_task: ['', Validators.required],
      deadline: ['', Validators.required],
      state: false,
      associated_persons: this.fb.array([this.createPerson()], this.uniqueNamesValidator),
    });
  }

  createPerson(): FormGroup {
    return this.fb.group({
      full_name: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(19)]],
      skills: this.fb.array([this.createSkill()]), // Inicializa con al menos una habilidad
    });
  }

  createSkill(): AbstractControl {
    return this.fb.control('', Validators.required); // Asegura que cada habilidad sea requerida
  }

  get associated_persons(): FormArray {
    return this.taskForm.get('associated_persons') as FormArray;
  }

  getSkills(index: number): FormArray {
    return this.associated_persons.at(index).get('skills') as FormArray;
  }

  addPerson(): void {
    this.associated_persons.push(this.createPerson());
  }

  removePerson(index: number): void {
    this.associated_persons.removeAt(index);
  }

  addSkill(personIndex: number): void {
    const skills = this.getSkills(personIndex);
    // Solo agrega habilidad si no está vacía
    if (skills.controls.every(skill => skill.value)) {
      skills.push(this.createSkill());
    }
  }

  removeSkill(personIndex: number, skillIndex: number): void {
    this.getSkills(personIndex).removeAt(skillIndex);
  }

  uniqueNamesValidator(formArray: AbstractControl): { [key: string]: boolean } | null {
    const names = formArray.value.map((person: any) => person.full_name?.toLowerCase().trim());
    const uniqueNames = new Set(names);

    if (uniqueNames.size !== names.length) {
      return { nonUniqueNames: true };
    }

    return null;
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      this._serviceTask.createTask(this.taskForm.value).subscribe({
        next: () => {
          Swal.fire('Se ha creado la tarea con éxito');
          this.router.navigate(['/']);
        },
        error: (error) => console.error(error),
      });
    } else {
      Swal.fire('Por favor completa todos los campos obligatorios');
    }
  }
}
