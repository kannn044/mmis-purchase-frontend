import { Component, OnInit, Input, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PurchasingOrderService } from '../../purchase/share/purchasing-order.service';
import * as _ from 'lodash';
import * as moment from 'moment';
@Component({
  selector: 'app-html-preview',
  templateUrl: './html-preview.component.html',
  styleUrls: ['./html-preview.component.css']
})
export class HtmlPreviewComponent implements OnInit {
  startDate: any;
  endDate: any;

  urlReportPO: any;
  urlReportEGP: any;
  urlReportP10: any;
  urlReportP11: any;

  reportURL: any;
  isShow = false;
  token: any;
  constructor(
    private santizer: DomSanitizer,
    private model: PurchasingOrderService,
    @Inject('API_URL') public url: String
  ) {
    this.token = sessionStorage.getItem('token');
  }

  showReport(url: any) {
    this.isShow = true;
    this.reportURL = this.santizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit() {
    this.getSysReport();
  }

  async getSysReport() {
    const rs = await this.model.sysReport();
    const idxPo: any = _.findIndex(rs.rows, { report_type: 'PO' });
    idxPo > -1 ? this.urlReportPO = rs.rows[idxPo].report_url : this.urlReportPO = null

    const idxEGP: any = _.findIndex(rs.rows, { report_type: 'EGP' });
    idxEGP > -1 ? this.urlReportEGP = rs.rows[idxEGP].report_url : this.urlReportEGP = null

    const idxP10: any = _.findIndex(rs.rows, { report_type: 'P10' });
    idxP10 > -1 ? this.urlReportP10 = rs.rows[idxP10].report_url : this.urlReportP10 = null

    const idxP11: any = _.findIndex(rs.rows, { report_type: 'P11' });
    idxP11 > -1 ? this.urlReportP11 = rs.rows[idxP11].report_url : this.urlReportP11 = null
  }

  printPurchaseOrder(row: any) {
    this.showReport(this.url + `${this.urlReportPO}/?token=${this.token}&porder=` + row.purchase_order_id);
  }

  printpPurchasing(row: any) {
    const created_date = moment(row.order_date).format('YYYY-MM-DD');
    this.showReport(this.url + `/report/purchasing/?startdate=${created_date}&token=${this.token}`);
  }

  printPuchasing10(row: any) {
    this.showReport(this.url + `${this.urlReportP10}?purchaOrderId=${row.purchase_order_id}&type=8&bgtype=1&token=${this.token}`);
  }


  printReportItems(id: string, order_id: string) {
    const forms: Array<any> = [
      { 'id': '3', 'name': 'ใบองค์การเภสัชกรรม', path: this.url + `${this.urlReportP11}/?purchaOrderId=${order_id}&type=8&bgtype=1&token=${this.token}` },
      { 'id': '4', 'name': 'ใบสั่งซื้อที่เลือก', path: this.url + `/report/getporder?token=${this.token}` },
      { 'id': '5', 'name': 'แบบฟอ์รม e-GP', path: this.url + `${this.urlReportEGP}?porder=${order_id}&type=8&token=${this.token}` },
    ];
    const print = _.find(forms, { 'id': id });
    this.showReport(print ? print.path : this.url);
  }

  printPurchaseOrderAttach(row: any) {
    this.printReportItems('3', row.purchase_order_id);
  }
  printPurchaseOrderEgp(row: any) {
    this.printReportItems('5', row.purchase_order_id);
  }
}
