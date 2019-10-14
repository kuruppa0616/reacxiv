const Screens = {
	App: 'App',
	AuthCheck: 'AuthCheck',
	Login: 'Login',
	AppStacks: {
		AppStack: 'AppStack',
		Details: {
			IllustDetail: 'IllustDetail',
			UserDetail: 'UserDetail'
		},
		Viewer: {
			IllustViewer:"IllustViewer"
		},
		AppDrawers: {
			AppDrawer: 'AppDrawer',
			HomeTabs: {
				HomeTab: 'Home',
				Top: 'Top',
				Recommend: 'Recommend',
				New: 'New'
			}
		}
	}
} as const;

export default Screens;
