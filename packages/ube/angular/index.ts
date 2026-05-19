// @ulam/ube/ng — Angular adapter layer
import '@ulam/ube/core'

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ButtonTextComponent } from './button-text.component'
import { ButtonIconComponent } from './button-icon.component'
import { ButtonBackComponent } from './button-back.component'
import { LinkBtnStyledComponent } from './link-btn-styled.component'
import { LinkSkipToComponent } from './link-skip-to.component'
import { FormControlRadioComponent } from './form-control-radio.component'
import { FormControlCheckboxComponent } from './form-control-checkbox.component'
import { FormControlSelectComponent } from './form-control-select.component'
import { FormInputWithClearComponent } from './form-input-with-clear.component'
import { FormInputSearchComponent } from './form-input-search.component'
import { BadgeComponent } from './badge.component'
import { InfoBoxComponent } from './info-box.component'
import { IconExternalLinkComponent } from './icon-external-link.component'
import { FormControlToggleComponent } from './form-control-toggle.component'
import { PanelFormControlsComponent } from './panel-form-controls.component'
import { FadeTransitionComponent } from './fade-transition.component'
import { FormControlRadioChipComponent } from './form-control-radio-chip.component'
import { FormControlRadioChipGroupComponent } from './form-control-radio-chip-group.component'

const components = [
  ButtonTextComponent,
  ButtonIconComponent,
  ButtonBackComponent,
  LinkBtnStyledComponent,
  LinkSkipToComponent,
  FormControlRadioComponent,
  FormControlCheckboxComponent,
  FormControlSelectComponent,
  FormInputWithClearComponent,
  FormInputSearchComponent,
  BadgeComponent,
  InfoBoxComponent,
  IconExternalLinkComponent,
  FormControlToggleComponent,
  PanelFormControlsComponent,
  FadeTransitionComponent,
  FormControlRadioChipComponent,
  FormControlRadioChipGroupComponent,
]

@NgModule({
  declarations: components,
  exports: components,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UbeModule {}

export { ButtonTextComponent }
export { ButtonIconComponent }
export { ButtonBackComponent }
export { LinkBtnStyledComponent }
export { LinkSkipToComponent }
export { FormControlRadioComponent }
export { FormControlCheckboxComponent }
export { FormControlSelectComponent }
export { FormInputWithClearComponent }
export { FormInputSearchComponent }
export { BadgeComponent }
export { InfoBoxComponent }
export { IconExternalLinkComponent }
export { FormControlToggleComponent }
export { PanelFormControlsComponent }
export { FadeTransitionComponent }
export { FormControlRadioChipComponent }
export { FormControlRadioChipGroupComponent }
