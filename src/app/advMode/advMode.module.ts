import { PersonalPanelComponent } from './personalPanel/personal-panel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';

import { LayoutComponent } from './default/layout.component';
import { AppLayoutHorizontalComponent } from './horizontal/app-layout-horizontal/app-layout-horizontal.component';

import { LayoutMiniSidebarComponent } from './menu/layout-mini-sidebar/layout-mini-sidebar.component';
import { LayoutSidebarComponent } from './menu/layout-sidebar/layout-sidebar.component';
import { HeaderComponent } from './header/header/header.component';
import { AdventureComponent } from './adventure/adventure.component';
import { LogComponent } from './log/log.component';
import { SceneComponent } from './scene/scene.component';
import { ActionButtonComponent } from './actionButton/action-button.component';
import { PlaceInfoComponent } from './placeInfo/place-info.component';
import { RightPanelComponent } from './rightPanel/right-panel.component';
import { ActionsPanelComponent } from './actionsPanel/actions-panel.component';
import { ReachablePlacesComponent } from './reachablePlaces/reachable-places.component';
@NgModule({
  declarations: [
    LayoutComponent,
    AppLayoutHorizontalComponent,
    LogComponent,
    SceneComponent,
    LayoutMiniSidebarComponent,
    LayoutSidebarComponent,
    AdventureComponent,
    HeaderComponent,
    ActionButtonComponent,
    PlaceInfoComponent,
    RightPanelComponent,
    ActionsPanelComponent,
    ReachablePlacesComponent,
    PersonalPanelComponent,
  ],
  imports: [CommonModule, SharedModule, MatMenuModule],
  exports: [
    LayoutComponent,
    AppLayoutHorizontalComponent,
    LayoutMiniSidebarComponent,
    LayoutSidebarComponent,
    HeaderComponent,
    ActionButtonComponent,
    PlaceInfoComponent,
    RightPanelComponent,
    ActionsPanelComponent,
  ],
})
export class AdvModeModule {}
