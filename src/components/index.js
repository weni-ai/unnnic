import Vue from 'vue';
import input from './Input/Input.vue';
import inputNext from './InputNext/InputNext.vue';
import inputDatePicker from './InputDatePicker/InputDatePicker.vue';
import button from './Button/Button.vue';
import buttonIcon from './Button/ButtonIcon.vue';
import sidebar from './Sidebar/Sidebar.vue';
import sidebarItem from './Sidebar/SidebarItem.vue';
import sidebarMenu from './Sidebar/SidebarMenu.vue';
import sidebarPrimary from './Sidebar/SidebarPrimary.vue';
import table from './Table/Table.vue';
import tableRow from './Table/TableRow.vue';
import dropdown from './Dropdown/Dropdown.vue';
import dropdownItem from './Dropdown/DropdownItem.vue';
import avatarIcon from './AvatarIcon/AvatarIcon.vue';
import icon from './Icon.vue';
import toolTip from './ToolTip/ToolTip.vue';
import card from './Card/Card.vue';
import cardCompany from './Card/CardCompany.vue';
import cardData from './Card/CardData.vue';
import cardProject from './CardProject/CardProject.vue';
import cardInformation from './CardInformation/CardInformation.vue';
import checkbox from './Checkbox/Checkbox.vue';
import radio from './Radio/Radio.vue';
import languageSelect from './Dropdown/LanguageSelect.vue';
import modal from './Modal/Modal.vue';
import modalNext from './ModalNext/ModalNext.vue';
import modalUpload from './ModalUpload/ModalUpload.vue';
import call from '../utils/call';
import select from './Select/Select.vue';
import selectItem from './Select/SelectItem.vue';
import multiSelect from './MultiSelect/MultiSelect.vue';
import alert from './Alert/Alert.vue';
import autocomplete from './Input/Autocomplete.vue';
import autocompleteSelect from './AutocompleteSelect/AutocompleteSelect.vue';
import tag from './Tag/Tag.vue';
import accordion from './Accordion/Accordion.vue';
import indicator from './Indicator/Indicator.vue';
import skeletonLoading from './SkeletonLoading/SkeletonLoading.vue';
import carousel from './Carousel/Carousel.vue';
import label from './Label/Label.vue';
import tab from './Tab/Tab.vue';
import banner from './Banner/Banner.vue';
import comment from './Comment/Comment.vue';
import datePicker from './DatePicker/DatePicker.vue';
import breadcrumb from './Breadcrumb/Breadcrumb.vue';
import Switch from './Switch/Switch.vue';
import Slider from './Slider/Slider.vue';
import DataArea from './DataArea/DataArea.vue';
import Pagination from './Pagination/Pagination.vue';
import UploadArea from './UploadArea/UploadArea.vue';
import ImportCard from './ImportCard/ImportCard.vue';
import DateFilter from './DateFilter/DateFilter.vue';
import ChatText from './ChatText/ChatText.vue';
import TextArea from './TextArea/TextArea.vue';
import CardNumber from './CardNumber/CardNumber.vue';
import chartRainbow from './ChartRainbow/ChartRainbow.vue';
import chartBar from './ChartBar/ChartBar.vue';
import chartLine from './ChartLine/ChartLine.vue';
import textEditor from './TextEditor/TextEditor.vue';
import moodRating from './MoodRating/MoodRating.vue';
import starRating from './StarRating/StarRating.vue';
import audioRecorder from './AudioRecorder/AudioRecorder.vue';
import circleProgressBar from './CircleProgressBar/CircleProgressBar.vue';
import progressBar from './ProgressBar/ProgressBar.vue';

const components = {
  unnnicInput: input,
  unnnicInputNext: inputNext,
  unnnicInputDatePicker: inputDatePicker,
  unnnicButton: button,
  unnnicButtonIcon: buttonIcon,
  unnnicSidebar: sidebar,
  unnnicSidebarItem: sidebarItem,
  unnnicSidebarMenu: sidebarMenu,
  unnnicSidebarPrimary: sidebarPrimary,
  unnnicTable: table,
  unnnicTableRow: tableRow,
  unnnicAvatarIcon: avatarIcon,
  unnnicIcon: icon,
  unnnicIconSvg: icon,
  unnnicDropdown: dropdown,
  unnnicDropdownItem: dropdownItem,
  unnnicToolTip: toolTip,
  unnnicCard: card,
  unnnicCardCompany: cardCompany,
  unnnicCardData: cardData,
  unnnicCardProject: cardProject,
  unnnicCardInformation: cardInformation,
  unnnicCheckbox: checkbox,
  unnnicRadio: radio,
  unnnicLanguageSelect: languageSelect,
  unnnicModal: modal,
  unnnicModalNext: modalNext,
  unnnicModalUpload: modalUpload,
  unnnicSelect: select,
  unnnicSelectItem: selectItem,
  unnnicMultiSelect: multiSelect,
  unnnicAlert: alert,
  unnnicAutocomplete: autocomplete,
  unnnicAutocompleteSelect: autocompleteSelect,
  unnnicTag: tag,
  unnnicAccordion: accordion,
  unnnicIndicator: indicator,
  unnnicSkeletonLoading: skeletonLoading,
  unnnicCarousel: carousel,
  unnnicLabel: label,
  unnnicTab: tab,
  unnnicBanner: banner,
  unnnicComment: comment,
  unnnicDatePicker: datePicker,
  unnnicBreadcrumb: breadcrumb,
  unnnicSwitch: Switch,
  unnnicSlider: Slider,
  unnnicDataArea: DataArea,
  unnnicPagination: Pagination,
  unnnicUploadArea: UploadArea,
  unnnicImportCard: ImportCard,
  unnnicDateFilter: DateFilter,
  unnnicChatText: ChatText,
  unnnicTextArea: TextArea,
  unnnicCardNumber: CardNumber,
  unnnicChartRainbow: chartRainbow,
  unnnicChartBar: chartBar,
  unnnicChartLine: chartLine,
  unnnicTextEditor: textEditor,
  unnnicMoodRating: moodRating,
  unnnicStarRating: starRating,
  unnnicAudioRecorder: audioRecorder,
  unnnicCircleProgressBar: circleProgressBar,
  unnnicProgressBar: progressBar,
};

Object.keys(components).forEach((name) => {
  Vue.component(name, components[name]);
});

export const unnnicInput = input;
export const unnnicInputNext = inputNext;
export const unnnicInputDatePicker = inputDatePicker;
export const unnnicButton = button;
export const unnnicButtonIcon = buttonIcon;
export const unnnicSidebar = sidebar;
export const unnnicSidebarItem = sidebarItem;
export const unnnicSidebarMenu = sidebarMenu;
export const unnnicSidebarPrimary = sidebarPrimary;
export const unnnicTable = table;
export const unnnicTableRow = tableRow;
export const unnnicDropdown = dropdown;
export const unnnicDropdownItem = dropdownItem;
export const unnnicAvatarIcon = avatarIcon;
export const unnnicIcon = icon;
export const unnnicIconSvg = icon;
export const unnnicToolTip = toolTip;
export const unnnicCard = card;
export const unnnicCardCompany = cardCompany;
export const unnnicCardData = cardData;
export const unnnicCardProject = cardProject;
export const unnnicCardInformation = cardInformation;
export const unnnicCheckbox = checkbox;
export const unnnicRadio = radio;
export const unnniclanguageSelect = languageSelect;
export const unnnicModal = modal;
export const unnnicModalNext = modalNext;
export const unnnicModalUpload = modalUpload;
export const unnnicSelect = select;
export const unnnicSelectItem = selectItem;
export const unnnicMultiSelect = multiSelect;
export const unnnicAlert = alert;
export const unnnicCallAlert = call.callAlert;
export const unnnicCallModal = call.callModal;
export const unnnicAutocomplete = autocomplete;
export const unnnicAutocompleteSelect = autocompleteSelect;
export const unnnicTag = tag;
export const unnnicAccordion = accordion;
export const unnnicIndicator = indicator;
export const unnnicSkeletonLoading = skeletonLoading;
export const unnnicCarousel = carousel;
export const unnnicLabel = label;
export const unnnicTab = tab;
export const unnnicBanner = banner;
export const unnnicComment = comment;
export const unnnicDatePicker = datePicker;
export const unnnicBreadcrumb = breadcrumb;
export const unnnicSwitch = Switch;
export const unnnicSlider = Slider;
export const unnnicDataArea = DataArea;
export const unnnicPagination = Pagination;
export const unnnicUploadArea = UploadArea;
export const unnnicImportCard = ImportCard;
export const unnnicDateFilter = DateFilter;
export const unnnicChatText = ChatText;
export const unnnicTextArea = TextArea;
export const unnnicCardNumber = CardNumber;
export const unnnicChartRainbow = chartRainbow;
export const unnnicChartBar = chartBar;
export const unnnicChartLine = chartLine;
export const unnnicTextEditor = textEditor;
export const unnnicMoodRating = moodRating;
export const unnnicStarRating = starRating;
export const unnnicAudioRecorder = audioRecorder;
export const unnnicCircleProgressBar = circleProgressBar;
export const unnnicProgressBar = progressBar;
