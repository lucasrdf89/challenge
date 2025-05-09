import { TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotificationService } from "./notification.service";

describe("NotificationService", () => {
    let service: NotificationService;
    let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

    beforeEach(() => {
        snackBarSpy = jasmine.createSpyObj("MatSnackBar", ["open"]);
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule],
            providers: [
                { provide: MatSnackBar, useValue: snackBarSpy }
            ]
        });
        service = TestBed.inject(NotificationService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should show success notification", () => {
        service.success("Success message");
        expect(snackBarSpy.open).toHaveBeenCalledWith(
            jasmine.stringMatching(/✅.*Success message/),
            "Cerrar",
            jasmine.objectContaining({ duration: 3000, verticalPosition: "top" })
        );
    });

    it("should show error notification", () => {
        service.error("Error message");
        expect(snackBarSpy.open).toHaveBeenCalledWith(
            jasmine.stringMatching(/❌.*Error message/),
            "Cerrar",
            jasmine.objectContaining({ duration: 3000, verticalPosition: "top" })
        );
    });

    it("should show warning notification", () => {
        service.warning("Warning message");
        expect(snackBarSpy.open).toHaveBeenCalledWith(
            jasmine.stringMatching(/⚠️.*Warning message/),
            "Cerrar",
            jasmine.objectContaining({ duration: 3000, verticalPosition: "top" })
        );
    });
});
