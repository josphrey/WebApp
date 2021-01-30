import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '../_services';

@Component({ templateUrl: 'details.component.html' })
export class DetailsComponent implements OnInit {
    form: FormGroup;
    id: string;
    users = null;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private accountService: AccountService,
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        this.form = this.formBuilder.group({
            firstName: [''],
            lastName: [''],
            email: ['']
        });

        this.accountService.getById(this.id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));


    }
}