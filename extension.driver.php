<?php

	class Extension_EpicEditor extends Extension {
	/*-------------------------------------------------------------------------
		Definition:
	-------------------------------------------------------------------------*/

		public function about() {
			return array(
				'name'			=> 'Epic Editor',
				'version'		=> '0.1',
				'release-date'	=> '2012-08-02',
				'author'		=> array(
					'name' => 'Tony Arnold',
					'website' => 'http://thecocoabots.com',
					'email' => 'tony@thecocoabots.com'
				),
				'description' => 'Adds EpicEditor to every textarea field on every entry page.'
			);
		}

		public function getSubscribedDelegates() {
			return array(
				array(
					'page'		=> '/backend/',
					'delegate'	=> 'InitaliseAdminPageHead',
					'callback'	=> 'initaliseAdminPageHead'
				)
			);
		}

		public function initaliseAdminPageHead($context) {
			$page = Administration::instance()->Page;
			$context = $page->getContext();
			$callback = Administration::instance()->getPageCallback();

			// only proceed on New or Edit publish pages
			if ($page instanceof contentPublish and in_array($context['page'], array('new', 'edit'))) {
				$page->addStylesheetToHead(URL . '/extensions/epiceditor/assets/epiceditor.symphony.css', 'screen', 10);
	            $page->addScriptToHead(URL . '/extensions/epiceditor/assets/epiceditor/js/epiceditor.js', 19001);
				$page->addScriptToHead(URL . '/extensions/epiceditor/assets/epiceditor.symphony.js', 19002);
			}
		}
	}

?>
