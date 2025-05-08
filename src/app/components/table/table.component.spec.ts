import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TableComponent } from "./table.component";

describe("TableComponent", <T extends { checked?: boolean | undefined }>() => {
    let component: TableComponent<T>;
    let fixture: ComponentFixture<TableComponent<T>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TableComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TableComponent<T>);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
