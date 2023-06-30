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
import * as process from "process";
import { IOdooConfig } from "./mocha.env";

const expect = chai.expect;

describe("Odoo XMLRPC Protocol", () => {
  let config: IOdooConfig = null;
  before(() => {
    config = {
      host: process.env.ODOO_HOST,
      db: process.env.ODOO_DB,
      username: process.env.ODOO_USERNAME,
      apikey: process.env.ODOO_PASSWORD
    };
  });

  it("Check Odoo Version 14.0", (done) => {
    const odooCtrl = new Odoo(config.host);
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
    const odooCtrl = new Odoo(config.host);
    odooCtrl
      .authenticate(config.db, config.username, config.apikey)
      .then((value: any) => {
        expect(value).to.be.a("number");
        done();
      })
      .catch(done);
  }).timeout(20000);
});
