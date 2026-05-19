// @ulam/ube/ng — Angular adapter layer
import '@ulam/ube/core'

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ButtonComponent } from './button.component'
import { ButtonBackComponent } from './button-back.component'
import { LinkBtnStyledComponent } from './link-btn-styled.component'
import { LinkSkipToComponent } from './link-skip-to.component'
import { FormControlRadioComponent } from './form-control-radio.component'
import { FormControlCheckboxComponent } from './form-control-checkbox.component'
import { FormControlSelectComponent } from './form-control-select.component'
import { FormInputTextComponent } from './form-input-text.component'
import { FormControlRadioGroupComponent } from './form-control-radio-group.component'
import { BadgeComponent } from './badge.component'
import { InfoBoxComponent } from './info-box.component'
import { IconExternalLinkComponent } from './icon-external-link.component'
import { FormControlToggleComponent } from './form-control-toggle.component'
import { PanelFormControlsComponent } from './panel-form-controls.component'
import { FadeTransitionComponent } from './fade-transition.component'
import { FormControlRadioChipComponent } from './form-control-radio-chip.component'
import { FormControlRadioChipGroupComponent } from './form-control-radio-chip-group.component'
import { UbeAriaDisabledDirective } from './aria-disabled.directive'

const components = [
  ButtonComponent,
  ButtonBackComponent,
  LinkBtnStyledComponent,
  LinkSkipToComponent,
  FormControlRadioComponent,
  FormControlCheckboxComponent,
  FormControlSelectComponent,
  FormInputTextComponent,
  FormControlRadioGroupComponent,
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
  exports: [...components, UbeAriaDisabledDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UbeModule {}

export { ButtonComponent }
export { ButtonBackComponent }
export { LinkBtnStyledComponent }
export { LinkSkipToComponent }
export { FormControlRadioComponent }
export { FormControlCheckboxComponent }
export { FormControlSelectComponent }
export { FormInputTextComponent }
export { FormControlRadioGroupComponent }
export { BadgeComponent }
export { InfoBoxComponent }
export { IconExternalLinkComponent }
export { FormControlToggleComponent }
export { PanelFormControlsComponent }
export { FadeTransitionComponent }
export { FormControlRadioChipComponent }
export { FormControlRadioChipGroupComponent }
export { UbeAriaDisabledDirective }
