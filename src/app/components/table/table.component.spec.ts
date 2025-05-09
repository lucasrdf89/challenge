import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";

import { TableComponent } from "./table.component";

interface TestRow { name: string; checked?: boolean; }
const TEST_DATA: TestRow[] = [
    { name: "Row 1", checked: true },
    { name: "Row 2", checked: false }
];

describe("TableComponent", () => {
    let component: TableComponent<TestRow>;
    let fixture: ComponentFixture<TableComponent<TestRow>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TableComponent,
                CommonModule,
                MatTableModule,
                MatCheckboxModule,
                MatButtonModule,
                MatIconModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TableComponent<TestRow>);
        component = fixture.componentInstance;
        (component as any).data = TEST_DATA;
        (component as any).cols = ["name"];
        (component as any).displayedColumns = ["name"];
        (component as any).checkInput = true;
        component.ngOnChanges();
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should render table headers", () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const headers = compiled.querySelectorAll("th[mat-header-cell]");
        expect(headers.length).toBeGreaterThan(0);
        const headerTexts = Array.from(headers).map(h => h.textContent?.toLowerCase() ?? "");
        expect(headerTexts.some(text => text.includes("name"))).toBeTrue();
    });

    it("should render table rows", () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const rows = compiled.querySelectorAll("tr[mat-row]");
        expect(rows.length).toBe(TEST_DATA.length);
        if (!component.isEmpty) {
            expect(compiled.textContent).toContain("Row 1");
            expect(compiled.textContent).toContain("Row 2");
        }
    });

    it("should render checkboxes if 'checkInput' is true", () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const checkboxes = compiled.querySelectorAll("mat-checkbox");
        expect(checkboxes.length).toBe(TEST_DATA.length);
    });
});
