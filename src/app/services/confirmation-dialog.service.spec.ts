import { TestBed } from "@angular/core/testing";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";

import { ConfirmationDialogService } from "./confirmation-dialog.service";

describe("ConfirmationDialogService", () => {
    let service: ConfirmationDialogService;
    let dialogSpy: jasmine.SpyObj<MatDialog>;

    beforeEach(() => {
        dialogSpy = jasmine.createSpyObj("MatDialog", ["open"]);
        TestBed.configureTestingModule({
            imports: [MatDialogModule],
            providers: [
                ConfirmationDialogService,
                { provide: MatDialog, useValue: dialogSpy }
            ]
        });
        service = TestBed.inject(ConfirmationDialogService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should open a dialog and resolve true when confirmed", async () => {
        const afterClosedSpy = jasmine.createSpyObj("afterClosed", ["toPromise"]);
        afterClosedSpy.toPromise.and.returnValue(Promise.resolve(true));
        dialogSpy.open.and.returnValue({ afterClosed: () => afterClosedSpy } as any);

        const result = await service.confirm("Title", "Message", "Confirm");
        expect(dialogSpy.open).toHaveBeenCalled();
        expect(result).toBeTrue();
    });

    it("should open a dialog and resolve false when cancelled", async () => {
        const afterClosedSpy = jasmine.createSpyObj("afterClosed", ["toPromise"]);
        afterClosedSpy.toPromise.and.returnValue(Promise.resolve(false));
        dialogSpy.open.and.returnValue({ afterClosed: () => afterClosedSpy } as any);

        const result = await service.confirm("Title", "Message", "Confirm");
        expect(dialogSpy.open).toHaveBeenCalled();
        expect(result).toBeFalse();
    });
});
