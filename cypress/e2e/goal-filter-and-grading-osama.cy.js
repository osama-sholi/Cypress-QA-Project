describe("Goals Page Filtration", () => {
  beforeEach(() => {
    cy.visit("https://goal-dev.mdx.ac.uk/accounts/login/?next=/");
    cy.get('input[name="username"]').type("osamashouli");
    cy.get('input[name="password"]').type("Os282974");
    cy.get('select[name="login_as"]').select("staff");
    cy.get('button[type="submit"]').click();
    cy.visit("https://goal-dev.mdx.ac.uk/staff/67/goals/");
    cy.get('label[for="not_observed"').click();
  });

  it("No Goal Selected", () => {
    cy.get('button[onclick="applyGoalFilters(this)"]').click();
    cy.on("window:alert", (message) => {
      expect(message).to.equal("Please selet a goal");
    });
  });

  it("No Group Selected", () => {
    cy.get('label[for="all_goals"]').click();
    cy.get('button[onclick="applyGoalFilters(this)"]').click();
    cy.on("window:alert", (message) => {
      expect(message).to.equal("Please selet a group");
    });
  });

  it("All Goals Selected", () => {
    cy.get('label[for="all_goals"]').click();
    cy.get('label[for="group_g1"]').click();
    cy.get('button[onclick="applyGoalFilters(this)"]').click();
    cy.get(".goals").should("have.length", 3);
  });

  it("All Groups Selected", () => {
    cy.get('label[for="goal_1319"]').click();
    cy.get('label[for="all_groups"').click();
    cy.get('button[onclick="applyGoalFilters(this)"]').click();
    cy.get(".group").should("have.length", 6);
  });

  it("All Levels Selected", () => {
    cy.get('label[for="all_goals"]').click();
    cy.get('label[for="group_g1"]').click();
    cy.get('button[onclick="applyGoalFilters(this)"]').click();
    cy.get(".goals").should("have.length", 3);
  });

  it("Not Observed Selected", () => {
    cy.get('label[for="all_goals"]').click();
    cy.get('label[for="all_groups"').click();
    cy.get('label[for="not_observed"').click();
    cy.get('button[onclick="applyGoalFilters(this)"]').click();
    cy.get(".goal_observed").should("have.length", 0);
  });

  it("GoalNum-2 Selected", () => {
    cy.get('label[for="goal_1319"]').click();
    cy.get('label[for="group_g1"]').click();
    cy.get('button[onclick="applyGoalFilters(this)"]').click();
    cy.get(".goal_1319").should("have.length", 1);
  });

  it("Low Level Selected", () => {
    cy.get('label[for="all_goals"]').click();
    cy.get('label[for="all_groups"').click();
    cy.get('label[for="level_Low"').click();
    cy.get('button[onclick="applyGoalFilters(this)"]').click();
    cy.get(".level_Low").should("have.length", 1);
  });
});
describe("Goals Page Grading", () => {
  beforeEach(() => {
    cy.visit("https://goal-dev.mdx.ac.uk/accounts/login/?next=/");
    cy.get('input[name="username"]').type("osamashouli");
    cy.get('input[name="password"]').type("Os282974");
    cy.get('select[name="login_as"]').select("staff");
    cy.get('button[type="submit"]').click();
    cy.visit("https://goal-dev.mdx.ac.uk/staff/67/goals/");
    cy.get('label[for="all_goals"]').click();
    cy.get('label[for="all_groups"').click();
    cy.get('label[for="not_observed"').click();
    cy.get('button[onclick="applyGoalFilters(this)"]').click();
    cy.contains("button", "Unobserve").wait(1000).click();
  });
  it("Grade One Student", () => {
    cy.get('button[onclick="observe(1028, 1319  , this)"]').click();
    cy.get('select[name="grade"]:not([disabled])')
      .first()
      .find("option")
      .should(($option) => {
        expect($option.eq(0)).to.have.value("0");
        expect($option.eq(1)).to.have.value("1");
        expect($option.eq(2)).to.have.value("2");
        expect($option.eq(3)).to.have.value("3");
        expect($option.eq(4)).to.have.value("4");
        expect($option.eq(5)).to.have.value("5");
        expect($option.eq(6)).to.have.value("6");
        expect($option.eq(7)).to.have.value("7");
        expect($option.eq(8)).to.have.value("8");
        expect($option.eq(9)).to.have.value("9");
        expect($option.eq(10)).to.have.value("10");
      });

    cy.get('select[name="grade"]:not([disabled])').first().select("10");
    cy.get("#snackbar").should(
      "contain.text",
      "The goal has been graded successfully."
    );
  });

  it("Grade Selected Students", () => {
    cy.get('select[onchange="gradeAllSelected(this)"]')
      .find("option")
      .should(($option) => {
        expect($option.eq(0)).to.have.value("Grade");
        expect($option.eq(1)).to.have.value("0");
        expect($option.eq(2)).to.have.value("1");
        expect($option.eq(3)).to.have.value("2");
        expect($option.eq(4)).to.have.value("3");
        expect($option.eq(5)).to.have.value("4");
        expect($option.eq(6)).to.have.value("5");
        expect($option.eq(7)).to.have.value("6");
        expect($option.eq(8)).to.have.value("7");
        expect($option.eq(9)).to.have.value("8");
        expect($option.eq(10)).to.have.value("9");
        expect($option.eq(11)).to.have.value("10");
      });

    cy.get('select[onchange="gradeAllSelected(this)"]').select("5");
    cy.get("#snackbar").should(
      "contain.text",
      "The goal(s) have been graded successfully."
    );
    cy.get(".observer_result")
      .filter(':has(select[name="grade"] option[value="5"]:selected)')
      .should("have.length", 23);
  });
});
