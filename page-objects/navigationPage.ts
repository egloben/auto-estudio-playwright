import { Page } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async formLayoutsPage() {
    await this.page.getByText("Forms").click();
    await this.page.getByText("Form Layouts").click();
  }

  async datePickerPage() {
    await this.selectGroupMenyItem("Forms");
    await this.page.getByText("Datepicker").click();
  }

  async smartTablePage() {
    await this.selectGroupMenyItem("Tables & Data");
    await this.page.getByText("Smart Table").click();
  }

  async toastrPage() {
    await this.selectGroupMenyItem("Modal & Overlays");
    await this.page.getByText("Toastr").click();
  }

  async tooltipPage() {
    await this.selectGroupMenyItem("Modal & Overlays");
    await this.page.getByText("Tooltip").click();
  }

  private async selectGroupMenyItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expandedState = await groupMenuItem.getAttribute("aria-expanded");
    if (expandedState == "false") await groupMenuItem.click();
  }
}
