import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogComponent } from "./dialog.component";

describe("DialogComponent", () => {
    let component: DialogComponent;
    let fixture: ComponentFixture<DialogComponent>;
    let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DialogComponent>>;

    beforeEach(async () => {
        dialogRefSpy = jasmine.createSpyObj("MatDialogRef", ["close"]);
        await TestBed.configureTestingModule({
            imports: [DialogComponent],
            providers: [
                { provide: MatDialogRef, useValue: dialogRefSpy },
                { provide: MAT_DIALOG_DATA, useValue: { message: "Test message" } }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should render the dialog message", () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.textContent).toContain("Test message");
    });
    
});
