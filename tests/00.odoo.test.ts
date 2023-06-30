/**
 * Copyright (C) 2022 Intelica. Scientific and Software Solutions
 * Author: Reinier Millo Sánchez <millo@intelica.mx>
 *
 * This file is part of the @intelica/odoo-xmlrpc package.
 * This project is distributed under MIT License.
 * Check LICENSE file in project root folder.
 */
import "mocha";
import * as chai from "chai";
import { Odoo, IServerVersion } from "../src";
const expect = chai.expect;

const odooServer = "odoo.inv.dardeus.io";
const db = "test";
const username = "admin@test.example.com";
const accessKey = "4ac89e51a5832ae796b0742ba1f388524224f383";

describe("Odoo XMLRPC Protocol", () => {
  it("Check Odoo Version 14.0", (done) => {
    const odooCtrl = new Odoo(odooServer);
    odooCtrl
      .version()
      .then((value: IServerVersion) => {
        expect(value.protocol_version).to.equal(1);
        expect(parseFloat(value.server_version)).to.greaterThan(14.0);
        done();
      })
      .catch(done);
  }).timeout(20000);

  it("Autenticate user account", (done) => {
    const odooCtrl = new Odoo(odooServer);
    odooCtrl
      .authenticate(db, username, accessKey)
      .then((value: any) => {
        expect(value).to.be.a("number");
        done();
      })
      .catch(done);
  }).timeout(20000);
});
