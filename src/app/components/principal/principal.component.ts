import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from 'src/app/interfaces/Estudiante';
import { Opciones } from 'src/app/interfaces/Opciones';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements AfterViewInit {
  form: FormGroup;
  listaEstudiante: Estudiante[] = [];
  promedioGlobal: number = 0;

  displayedColumns: string[] = ['cedula', 'nombre', 'apellido', 'porcentajeAsistencia', 'nota1', 'nota2', 'promedio', 'mensaje', 'acciones', 'promedioGlobal'];
  dataSource = new MatTableDataSource<Estudiante>();
  #loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.data = this.listaEstudiante;

    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por pag';
    }
    this.calcularPromedioGlobal();
  }

  calcularPromedioGlobal() {
    if (this.listaEstudiante.length > 0) {
      const sumatoriaPromedios = this.listaEstudiante.reduce((total, estudiante) => total + (estudiante.promedio || 0), 0);
      this.promedioGlobal = sumatoriaPromedios / this.listaEstudiante.length;
    } else {
      this.promedioGlobal = 0;
    }
  
    this.dataSource.data = [...this.listaEstudiante, { promedioGlobal: this.promedioGlobal, cedula: '' } as Estudiante];
  }
  

  agregarEstudiante(): void {
    const estudiante: Estudiante = {
      cedula: this.form.value.cedula,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      porcentajeAsistencia: this.form.value.porcentajeAsistencia,
      nota1: this.form.value.nota1,
      nota2: this.form.value.nota2,
      asistencia: this.form.value.asistencia,
    };
  
    const nota1 = parseFloat(estudiante.nota1 as any) || 0;
    const nota2 = parseFloat(estudiante.nota2 as any) || 0;
  
    // Calcular el promedio
    estudiante.promedio = (nota1 + nota2) / 2;
  
    if (estudiante.porcentajeAsistencia !== undefined) {
      estudiante.mensaje = estudiante.porcentajeAsistencia < 70 ? 'Reprobado por asistencia' : estudiante.promedio >= 7 ? 'Aprobado' : 'Reprobado';
    } else {
    }
  
    this.listaEstudiante.push(estudiante);
    this.dataSource.data = this.listaEstudiante;
  
    this.mensajeExito('registrado');
    this.calcularPromedioGlobal();
  }
  

  mensajeExito(texto: string) {
    this._snackBar.open(`El alumno fue ${texto} con exito`, 'Sistema', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  eliminarEstudiante(cedula: string): void {
    const indice = this.listaEstudiante.findIndex(element => element.cedula == cedula)
    console.log(indice);
    this.listaEstudiante.splice(indice, 1);
    this.dataSource.data = this.listaEstudiante;
  }

  mostrar(element: Estudiante): void {
    console.log(element.nombre);
    console.log(JSON.stringify(element));
    this.router.navigate(['mostrar', JSON.stringify(element)]);
  }

  cancelar(): void {
    this.form.reset();
  }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private aRoute: ActivatedRoute) {

    this.form = this.fb.group({
      cedula: ['',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern(/^([0-9])*$/)
        ]
      ],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      porcentajeAsistencia: [''],
      nota1: [''],
      nota2: [''], 
    })
  }
}
