import { HistoryOrderComponent } from './history-order/history-order.component';
import { PurchaseOrderComponent } from './report/purchase-order/purchase-order.component';
import { PurchasingofficerComponent } from './officer/officer.component';
import { MappingCommitteeComponent } from './mapping-committee/mapping-committee.component';
import { PrintComponent } from './print/print.component';
import { CommitteeComponent } from './committee/committee.component';
import { OrdersCancelComponent } from './orders-cancel/orders-cancel.component';
import { OrdersApproveComponent } from './orders-approve/orders-approve.component';
import { OrdersWarehouseComponent } from './orders-warehouse/orders-warehouse.component';
import { AuthGuard } from './../auth-guard.service';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrdersComponent } from './orders/orders.component';
import { PageNotFoundComponent } from './../page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseOrderListComponent } from './report/purchase-order-list/purchase-order-list.component';
import { OrderPointComponent } from './order-point/order-point.component';
import { PurchaseBudgetHistoryComponent } from './report/purchase-budget-history/purchase-budget-history.component';
import { BidprocessComponent } from '../purchase/bidprocess/bidprocess.component';
import { OfficerTypeComponent } from './officer-type/officer-type.component';
import { SettingEdiComponent } from './setting-edi/setting-edi.component';


const routes: Routes = [
  {
    path: 'purchase',
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'orders', pathMatch: 'full' },
      // { path: 'reorder-point', component: ReorderPointComponent },
      { path: 'order-point', component: OrderPointComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'orders-approve', component: OrdersApproveComponent },
      { path: 'orders-warehouse', component: OrdersWarehouseComponent },
      { path: 'orders-cancel', component: OrdersCancelComponent },
      { path: 'new', component: OrderFormComponent },
      { path: 'edit', component: OrderFormComponent },
      { path: 'committee', component: CommitteeComponent },
      { path: 'mapping-committee', component: MappingCommitteeComponent },
      { path: 'print', component: PrintComponent },
      { path: 'officer', component: PurchasingofficerComponent },
      { path: 'bidprocess', component: BidprocessComponent },
      { path: 'report/purchase-order', component: PurchaseOrderComponent },
      { path: 'history-order', component: HistoryOrderComponent },
      { path: 'report/purchase-order-list', component: PurchaseOrderListComponent },
      { path: 'report/purchase-budget-history', component: PurchaseBudgetHistoryComponent },
      { path: 'officer-type', component: OfficerTypeComponent },
      { path: 'setting/edi', component: SettingEdiComponent },
      { path: '**', component: PageNotFoundComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
