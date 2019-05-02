import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ITrain } from 'app/shared/model/train.model';
import { TrainService } from './train.service';

@Component({
    selector: 'jhi-train-update',
    templateUrl: './train-update.component.html'
})
export class TrainUpdateComponent implements OnInit {
    train: ITrain;
    isSaving: boolean;

    constructor(protected trainService: TrainService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ train }) => {
            this.train = train;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.train.id !== undefined) {
            this.subscribeToSaveResponse(this.trainService.update(this.train));
        } else {
            this.subscribeToSaveResponse(this.trainService.create(this.train));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrain>>) {
        result.subscribe((res: HttpResponse<ITrain>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
