import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ToolbarComponent } from "./toolbar.component";

describe("ToolbarComponent", () => {
    let component: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ToolbarComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should render the toolbar title", () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const title = compiled.querySelector(".toolbar-title");
        expect(title).toBeTruthy();
        expect(title?.textContent).toContain("Tasks");
    });

    it("should have a logout button with text 'Logout'", () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const button = compiled.querySelector("button[aria-label='Logout']");
        expect(button).toBeTruthy();
        expect(button?.textContent).toContain("Logout");
    });
});
